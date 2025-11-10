"use client";

import { useState } from "react";

function ChapterItem({ chapter }: { chapter: any }) {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleGenerate() {
    setLoading(true);
    setAudioUrl(null);
    setError('');

    try {
      const formData = new FormData();
      formData.append("text", chapter.preview || "");

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/generate`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.audio_url) {
        throw new Error(data?.detail || "Failed to generate audio ❌");
      }

      setAudioUrl(data.audio_url);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <li className="border p-3 rounded bg-gray-50 flex flex-col">
      <div className="flex justify-between items-center">
        <strong>Chapter {chapter.id}</strong>
        <button
          onClick={handleGenerate}
          disabled={loading}
          className={`px-3 py-1 text-sm rounded text-white ${
            loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Generating..." : "Generate Audio"}
        </button>
      </div>
      <p className="text-sm text-gray-700 mt-2">{chapter.preview}</p>
      {error && <p className="text-xs text-red-600 mt-2">{error}</p>}
      {audioUrl && (
        <audio controls autoPlay className="mt-3 w-full" src={audioUrl} />
      )}
    </li>
  );
}


export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [chapters, setChapters] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleUpload() {
    if (!file) return;
    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      setChapters(data.chapters || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6 text-gray-900">
      <h1 className="text-3xl font-bold mb-6">📚 Upload Your Book</h1>

      <input
        type="file"
        accept=".pdf,.epub,.txt"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="mb-4"
      />

      <button
        onClick={handleUpload}
        disabled={loading || !file}
        className={`px-4 py-2 rounded text-white ${
          loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Uploading..." : "Upload"}
      </button>

      {error && <p className="text-red-600 mt-4">{error}</p>}

      {chapters.length > 0 && (
        <div className="mt-6 bg-white p-4 rounded shadow-md w-full max-w-lg">
          <h2 className="text-lg font-semibold mb-3">Detected Chapters</h2>
          <ul className="space-y-2">
            {chapters.map((ch) => (
                <ChapterItem key={ch.id} chapter={ch} />
            ))}
            </ul>
        </div>
      )}
    </main>
  );
}
