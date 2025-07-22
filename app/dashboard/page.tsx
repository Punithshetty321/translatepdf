'use client';

import { useState } from 'react';

export default function DashboardPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

const handleUpload = async () => {
  if (!file) return;
  setLoading(true);
  setResult({ pages: [], transactions: [] });

  const formData = new FormData();
  formData.append('file', file);

  // Upload the file first
  const res = await fetch('http://localhost:5001/api/upload', {
    method: 'POST',
    body: formData,
  });

  const { streamUrl } = await res.json(); // streamUrl = '/api/ocr-pure'

  const eventSource = new EventSource(streamUrl);

  eventSource.onmessage = (e) => {
    const { page, text, transactions } = JSON.parse(e.data);
    setResult((prev: any) => ({
      pages: [...prev.pages, { page, text }],
      transactions: [...(prev.transactions || []), ...transactions],
    }));
  };

  eventSource.addEventListener('done', () => {
    eventSource.close();
    setLoading(false);
  });

  eventSource.onerror = (e) => {
    console.error('SSE error:', e);
    eventSource.close();
    setLoading(false);
  };
};

  return (
    <div className="p-6 max-w-4xl mx-auto justify-center flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Translate Document</h1>

      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <button
        onClick={handleUpload}
        disabled={!file || loading}
        className="bg-blue-600 text-white px-4 py-2 mt-4 rounded"
      >
        {loading ? 'Uploading...' : 'Upload & Translate'}
      </button>

      {result?.pages?.length > 0 && (
  <div className="mt-8 w-full">
    <h2 className="text-xl font-semibold mb-4">📄 Translated Pages</h2>
    {result.pages.map((p: any) => (
      <div key={p.page} className="mb-6 p-4 border rounded shadow bg-white">
        <h3 className="font-semibold mb-2">Page {p.page}</h3>
        <p className="whitespace-pre-wrap text-sm">{p.text}</p>
      </div>
    ))}
  </div>
)}

{result?.transactions?.length > 0 && (
  <div className="mt-12 w-full">
    <h2 className="text-xl font-semibold mb-4">🧾 Extracted Transactions</h2>
    <div className="overflow-x-auto">
      <table className="table-auto border border-gray-300 text-sm w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-2 py-1">Page</th>
            <th className="border px-2 py-1">Document #</th>
            <th className="border px-2 py-1">Buyer</th>
            <th className="border px-2 py-1">Seller</th>
            <th className="border px-2 py-1">Survey #</th>
            <th className="border px-2 py-1">Date</th>
            <th className="border px-2 py-1">Value</th>
          </tr>
        </thead>
        <tbody>
          {result.transactions.map((tx: any, idx: number) => (
            <tr key={idx}>
              <td className="border px-2 py-1">{tx.page ?? '-'}</td>
              <td className="border px-2 py-1">{tx.documentNumber ?? '-'}</td>
              <td className="border px-2 py-1">{tx.buyer ?? '-'}</td>
              <td className="border px-2 py-1">{tx.seller ?? '-'}</td>
              <td className="border px-2 py-1">{tx.surveyNumber ?? '-'}</td>
              <td className="border px-2 py-1">{tx.executionDate ?? '-'}</td>
              <td className="border px-2 py-1">{tx.value ?? '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)}
    </div>
  );
}