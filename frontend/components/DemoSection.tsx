'use client';

import { useState, useEffect, useRef } from 'react';
import GeneratedShowcase from './GeneratedShowcase';

const EMOTION_VARIANTS = [
  {
    key: 'dramatic',
    label: 'Dramatic',
    description: 'High-stakes narration with bold pacing.',
  },
  {
    key: 'suspenseful',
    label: 'Suspenseful',
    description: 'Tense delivery with rising intensity.',
  },
  {
    key: 'neutral',
    label: 'Neutral',
    description: 'Balanced, documentary-style narration.',
  },
];

export default function DemoSection() {
  const [text, setText] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState('');
  const [emotion, setEmotion] = useState('');
  const [voice, setVoice] = useState('');
  const [generatedAudios, setGeneratedAudios] = useState<any[]>([]);
  const [variationsLoading, setVariationsLoading] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const waveformRef = useRef<HTMLDivElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setFile(e.target.files[0]);
  };

  const handleGenerate = async (type: 'text' | 'file') => {
    setError('');
    setLoading(true);
    setAudioUrl('');
    setEmotion('');
    setVoice('');
    setGeneratedAudios([]);

    try {
      const formData = new FormData();
      if (type === 'text' && text.trim()) formData.append('text', text);
      else if (type === 'file' && file) formData.append('file', file);
      else throw new Error('No text or file provided.');

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/generate`, {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Generation failed');

      setAudioUrl(data.audio_url);
      setEmotion(data.emotion);
      setVoice(data.voice);

      const previewSnippet =
        type === 'text'
          ? text.trim().slice(0, 140) || 'Custom text input'
          : file
          ? `Uploaded file: ${file.name}`
          : 'Uploaded file';

      generateEmotionVariations(type, previewSnippet);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const buildFormData = (inputType: 'text' | 'file') => {
    const formData = new FormData();
    if (inputType === 'text' && text.trim()) {
      formData.append('text', text);
    } else if (inputType === 'file' && file) {
      formData.append('file', file);
    }
    return formData;
  };

  const generateEmotionVariations = async (inputType: 'text' | 'file', previewSnippet: string) => {
    if (inputType === 'text' && !text.trim()) return;
    if (inputType === 'file' && !file) return;

    setVariationsLoading(true);
    try {
      const results = [];
      for (const variant of EMOTION_VARIANTS) {
        const formData = buildFormData(inputType);
        if (!formData.has('text') && !formData.has('file')) continue;
        formData.append('target_emotion', variant.key);

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/generate`, {
          method: 'POST',
          body: formData,
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.detail || 'Variation generation failed');

        results.push({
          id: `${variant.key}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
          emotion: data.emotion ?? variant.key,
          audio_url: data.audio_url,
          voice: data.voice,
          title: `${variant.label} Sample`,
          description: variant.description,
          preview: previewSnippet,
        });
      }
      setGeneratedAudios(results);
    } catch (variationError) {
      console.error('Variation generation failed', variationError);
    } finally {
      setVariationsLoading(false);
    }
  };

  // 🎵 Real-time waveform visualization
  useEffect(() => {
    if (!audioUrl || !audioRef.current || !waveformRef.current) return;

    // Tear down any previous context before wiring a new one.
    audioCtxRef.current?.close().catch(() => {});

    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    audioCtxRef.current = audioCtx;

    const audioEl = audioRef.current;
    const source = audioCtx.createMediaElementSource(audioEl);
    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 128;

    source.connect(analyser);
    analyser.connect(audioCtx.destination);

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const resumeAudio = () => {
      if (audioCtx.state === 'suspended') {
        audioCtx.resume().catch(() => {});
      }
    };

    audioEl.addEventListener('play', resumeAudio, { once: true });
    audioEl.addEventListener('click', resumeAudio);

    const bars = Array.from({ length: bufferLength }).map(() => document.createElement('div'));
    waveformRef.current.innerHTML = '';
    bars.forEach((bar) => {
      let colorClass = 'from-blue-400 to-purple-500';

      switch (emotion) {
        case 'calm':
          colorClass = 'from-blue-400 to-cyan-400';
          break;
        case 'sad':
          colorClass = 'from-indigo-400 to-blue-600';
          break;
        case 'happy':
          colorClass = 'from-yellow-400 to-pink-400';
          break;
        case 'excited':
          colorClass = 'from-red-400 to-orange-500';
          break;
        case 'dramatic':
          colorClass = 'from-purple-500 to-pink-500';
          break;
        case 'suspenseful':
          colorClass = 'from-amber-300 to-red-600';
          break;
      }

      bar.className = `w-1 bg-gradient-to-t ${colorClass} rounded-full transition-all duration-100 glow-${emotion}`;
      bar.style.height = '10px';
      waveformRef.current!.appendChild(bar);
    });

    let animationId: number;
    const render = () => {
      animationId = requestAnimationFrame(render);
      analyser.getByteFrequencyData(dataArray);
      bars.forEach((bar, i) => {
        const h = dataArray[i] / 2.5;
        bar.style.height = `${Math.max(h, 3)}px`;
      });
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      audioEl.removeEventListener('play', resumeAudio);
      audioEl.removeEventListener('click', resumeAudio);
      source.disconnect();
      analyser.disconnect();
      audioCtx.close().catch(() => {});
      audioCtxRef.current = null;
    };
  }, [audioUrl, emotion]);

  return (
    <>
      <section className="py-24 bg-slate-900 min-h-screen flex flex-col items-center text-white">
        <div className="max-w-3xl w-full px-6">
          <h1 className="text-5xl font-bold mb-4 text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              Try the AI Audiobook Demo
            </span>
          </h1>
          <p className="text-slate-400 text-center mb-10">
            Generate emotion-aware audiobook clips from your own text or file.
          </p>

          <div className="bg-slate-800/70 backdrop-blur-md border border-slate-700 rounded-2xl p-6 shadow-xl">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text to generate..."
              className="w-full h-40 p-4 rounded-lg bg-slate-900/60 border border-slate-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none mb-4"
            />
            <input
              type="file"
              accept=".txt"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 
                         file:rounded-md file:border-0 file:text-sm file:font-semibold 
                         file:bg-blue-600/30 file:text-white hover:file:bg-blue-600/50 mb-4"
            />

            <div className="flex gap-4 justify-center">
              <button
                onClick={() => handleGenerate('text')}
                disabled={loading}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  loading
                    ? 'bg-blue-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-lg hover:scale-105'
                }`}
              >
                {loading ? 'Generating...' : 'Generate from Text'}
              </button>
              <button
                onClick={() => handleGenerate('file')}
                disabled={loading}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  loading
                    ? 'bg-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-gray-600 to-gray-700 hover:shadow-lg hover:scale-105'
                }`}
              >
                {loading ? 'Uploading...' : 'Upload File'}
              </button>
            </div>

            {error && <p className="text-red-400 text-sm mt-3">{error}</p>}

            {audioUrl && (
              <div className="mt-8 text-center space-y-4">
                <p className="text-sm text-slate-400">
                  Emotion detected: <span className="text-blue-400 font-semibold">{emotion}</span>
                </p>
                <p className="text-xs text-slate-500">Voice used: {voice}</p>

                <audio
                  key={audioUrl}
                  ref={audioRef}
                  crossOrigin="anonymous"
                  controls
                  className="w-full max-w-md mx-auto rounded-lg bg-slate-800 border border-slate-700 shadow-lg"
                  src={audioUrl}
                />

                <div ref={waveformRef} className="flex justify-center gap-1 items-end h-24 mt-4"></div>
              </div>
            )}
          </div>
        </div>
      </section>

      {(variationsLoading || generatedAudios.length > 0) && (
        <div className="w-full bg-slate-900 py-4">
          {variationsLoading && (
            <p className="text-center text-slate-400 mb-4">Creating emotion variations...</p>
          )}
          {generatedAudios.length > 0 && (
            <GeneratedShowcase generatedAudios={generatedAudios} />
          )}
        </div>
      )}
    </>
  );
}
