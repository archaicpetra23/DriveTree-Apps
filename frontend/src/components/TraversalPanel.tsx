"use client";

import { useTraversal } from "@/hooks/useFiles";
import FileTypeIcon from "@/components/FileTypeIcon";
import { useState, useEffect } from "react";

interface TraversalPanelProps {
  onRefresh?: () => void;
}

export default function TraversalPanel({ onRefresh }: TraversalPanelProps) {
  const { traversalResult, activeType, loading, runTraversal, clear } = useTraversal();
  const [animatedStep, setAnimatedStep] = useState(-1);
  const [isAnimating, setIsAnimating] = useState(false);

  // Step-by-step animation
  useEffect(() => {
    if (!traversalResult || !isAnimating) return;
    if (animatedStep >= traversalResult.steps.length - 1) {
      setIsAnimating(false);
      return;
    }
    const timer = setTimeout(() => {
      setAnimatedStep((prev) => prev + 1);
    }, 500);
    return () => clearTimeout(timer);
  }, [animatedStep, isAnimating, traversalResult]);

  const handleRun = async (type: "inorder" | "preorder" | "postorder") => {
    await runTraversal(type);
    if (onRefresh) onRefresh();
    setAnimatedStep(-1);
    setIsAnimating(true);
  };

  const descriptions: Record<string, { label: string; desc: string; order: string }> = {
    inorder: { label: "Inorder", desc: "Left → Root → Right", order: "Menghasilkan urutan A-Z" },
    preorder: { label: "Preorder", desc: "Root → Left → Right", order: "Copy tree structure" },
    postorder: { label: "Postorder", desc: "Left → Right → Root", order: "Delete tree safely" },
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/25">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div>
          <h3 className="font-semibold text-slate-800">Traversal BST</h3>
          <p className="text-xs text-slate-400">Telusuri semua node — O(n)</p>
        </div>
      </div>

      {/* Traversal buttons */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {(["inorder", "preorder", "postorder"] as const).map((type) => (
          <button
            key={type}
            onClick={() => handleRun(type)}
            disabled={loading}
            className={`py-2.5 px-3 rounded-xl text-sm font-semibold transition-all duration-200
              ${activeType === type
                ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30"
                : "bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-600"
              } disabled:opacity-50`}
          >
            {descriptions[type].label}
          </button>
        ))}
      </div>

      {/* Active description */}
      {activeType && descriptions[activeType] && (
        <div className="p-3 bg-blue-50 rounded-xl mb-4 animate-fadeIn">
          <p className="text-sm font-semibold text-blue-700">{descriptions[activeType].desc}</p>
          <p className="text-xs text-blue-500 mt-0.5">{descriptions[activeType].order}</p>
        </div>
      )}

      {/* Traversal results */}
      {traversalResult && traversalResult.steps.length > 0 ? (
        <div className="space-y-1.5 max-h-[300px] overflow-y-auto custom-scrollbar pr-1">
          {traversalResult.steps.map((step, i) => (
            <div
              key={`${step.step}-${step.name}`}
              className={`flex items-center gap-3 p-2.5 rounded-xl transition-all duration-300
                ${i <= animatedStep
                  ? "bg-blue-50 border border-blue-100"
                  : "bg-slate-50 border border-transparent opacity-40"
                }
                ${i === animatedStep ? "ring-2 ring-blue-300 scale-[1.02]" : ""}`}
            >
              <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold
                ${i <= animatedStep ? "bg-blue-500 text-white" : "bg-slate-200 text-slate-500"}`}>
                {step.step}
              </span>
              <div className="w-7 h-7 rounded-md bg-white border border-slate-200 flex items-center justify-center flex-shrink-0">
                <FileTypeIcon type={step.type} size={14} />
              </div>
              <span className={`text-sm font-medium ${i <= animatedStep ? "text-slate-700" : "text-slate-400"}`}>
                {step.name}
              </span>
              <span className="text-xs text-slate-400">.{step.type}</span>
            </div>
          ))}
        </div>
      ) : traversalResult && traversalResult.steps.length === 0 ? (
        <div className="text-center py-6 text-slate-400 text-sm">Tree kosong</div>
      ) : null}

      {/* Clear button */}
      {traversalResult && (
        <button
          onClick={() => { clear(); setAnimatedStep(-1); setIsAnimating(false); }}
          className="mt-3 w-full py-2 text-sm text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-xl transition-colors"
        >
          Reset
        </button>
      )}
    </div>
  );
}
