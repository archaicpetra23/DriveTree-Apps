"use client";

import {
  useRef,
  useEffect,
  useState,
  useCallback,
} from "react";

import type { TreeNode } from "@/types/file";
import { getFileCategoryColor } from "@/lib/helpers";

interface TreeVisualizerProps {
  tree: TreeNode | null;
  highlightPath?: string[];
}

interface NodePosition {
  x: number;
  y: number;
  node: TreeNode;
}

/**
 * Hitung depth tree
 */
function getTreeDepth(
  node: TreeNode | null
): number {
  if (!node) return 0;

  return (
    1 +
    Math.max(
      getTreeDepth(node.left),
      getTreeDepth(node.right)
    )
  );
}

/**
 * Hitung total subtree width
 * dipakai agar node tidak tabrakan
 */
function measureSubtree(
  node: TreeNode | null
): number {
  if (!node) return 0;

  const left = measureSubtree(node.left);
  const right = measureSubtree(node.right);

  return Math.max(left + right, 1);
}

/**
 * Layout BST proporsional anti-overlap
 */
function calculateTreeLayout(
  node: TreeNode | null,
  x: number,
  y: number,
  unitWidth: number,
  positions: NodePosition[],
  edges: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  }[]
) {
  if (!node) return;

  positions.push({ x, y, node });

  const verticalGap = 140;

  const leftWidth = measureSubtree(node.left);
  const rightWidth = measureSubtree(node.right);

  /**
   * LEFT CHILD
   */
  if (node.left) {
    const leftX =
      x - ((rightWidth + 1) * unitWidth) / 2;

    const leftY = y + verticalGap;

    edges.push({
      x1: x,
      y1: y,
      x2: leftX,
      y2: leftY,
    });

    calculateTreeLayout(
      node.left,
      leftX,
      leftY,
      unitWidth,
      positions,
      edges
    );
  }

  /**
   * RIGHT CHILD
   */
  if (node.right) {
    const rightX =
      x + ((leftWidth + 1) * unitWidth) / 2;

    const rightY = y + verticalGap;

    edges.push({
      x1: x,
      y1: y,
      x2: rightX,
      y2: rightY,
    });

    calculateTreeLayout(
      node.right,
      rightX,
      rightY,
      unitWidth,
      positions,
      edges
    );
  }
}

export default function TreeVisualizer({
  tree,
  highlightPath = [],
}: TreeVisualizerProps) {
  const containerRef =
    useRef<HTMLDivElement>(null);

  const [dimensions, setDimensions] =
    useState({
      width: 900,
      height: 600,
    });

  const [scale, setScale] = useState(1);

  const [offset, setOffset] = useState({
    x: 0,
    y: 0,
  });

  const [isDragging, setIsDragging] =
    useState(false);

  const [dragStart, setDragStart] =
    useState({
      x: 0,
      y: 0,
    });

  const [hoveredNode, setHoveredNode] =
    useState<string | null>(null);

  /**
   * Resize observer
   */
  useEffect(() => {
    const el = containerRef.current;

    if (!el) return;

    const obs = new ResizeObserver((entries) => {
      for (const e of entries) {
        setDimensions({
          width: e.contentRect.width,
          height: Math.max(
            e.contentRect.height,
            600
          ),
        });
      }
    });

    obs.observe(el);

    return () => obs.disconnect();
  }, []);

  /**
   * Reset zoom saat tree berubah
   */
  useEffect(() => {
    setScale(1);

    setOffset({
      x: 0,
      y: 0,
    });
  }, [tree]);

  /**
   * Zoom
   */
  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault();

      const delta =
        e.deltaY > 0 ? -0.1 : 0.1;

      setScale((prev) =>
        Math.min(
          Math.max(0.3, prev + delta),
          3
        )
      );
    },
    []
  );

  /**
   * Drag start
   */
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      setIsDragging(true);

      setDragStart({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      });
    },
    [offset]
  );

  /**
   * Dragging
   */
  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return;

      setOffset({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    },
    [isDragging, dragStart]
  );

  /**
   * Stop drag
   */
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const nodeRadius = 34;

  const depth = getTreeDepth(tree);

  const positions: NodePosition[] = [];

  const edges: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  }[] = [];

  let svgWidth = dimensions.width;

  /**
   * Build layout
   */
  if (tree) {
    const startX = dimensions.width / 2;

    const startY = 90;

    /**
     * Semakin besar semakin lega
     */
    const unitWidth = 160;

    calculateTreeLayout(
      tree,
      startX,
      startY,
      unitWidth,
      positions,
      edges
    );
  }

  const isHighlighted = (name: string) =>
    highlightPath.includes(name);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* HEADER */}
      <div className="flex items-center justify-between p-5 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/25">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.8}
                d="M12 3C8 3 5 6 5 9c0 2.5 1.5 4.5 3.5 5.5L8 18h8l-.5-3.5C17.5 13.5 19 11.5 19 9c0-3-3-6-7-6z"
              />
            </svg>
          </div>

          <div>
            <h3 className="font-semibold text-slate-800">
              Visualisasi BST
            </h3>

            <p className="text-xs text-slate-400">
              Binary Search Tree Structure
            </p>
          </div>
        </div>

        {/* CONTROLS */}
        <div className="flex items-center gap-2">
          <button
            onClick={() =>
              setScale((s) =>
                Math.min(s + 0.2, 3)
              )
            }
            className="zoom-btn"
            title="Zoom In"
          >
            +
          </button>

          <button
            onClick={() =>
              setScale((s) =>
                Math.max(s - 0.2, 0.3)
              )
            }
            className="zoom-btn"
            title="Zoom Out"
          >
            −
          </button>

          <button
            onClick={() => {
              setScale(1);

              setOffset({
                x: 0,
                y: 0,
              });
            }}
            className="zoom-btn"
            title="Reset"
          >
            Reset
          </button>
        </div>
      </div>

      {/* TREE AREA */}
      <div
        ref={containerRef}
        className="relative h-[700px] overflow-hidden bg-gradient-to-b from-slate-50 to-white cursor-grab active:cursor-grabbing"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {!tree ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400">
            <p className="font-medium">
              Tree kosong
            </p>

            <p className="text-xs mt-1 text-slate-300">
              Tambahkan file untuk melihat BST
            </p>
          </div>
        ) : (
          <svg
            width="100%"
            height="100%"
            viewBox={`0 0 ${svgWidth} ${Math.max(
              depth * 170 + 250,
              700
            )}`}
            style={{
              transform: `scale(${scale}) translate(${offset.x / scale}px, ${offset.y / scale}px)`,
              overflow: "visible",
            }}
            className="transition-transform duration-100"
          >
            {/* DEFINITIONS */}
            <defs>
              <linearGradient
                id="edgeGrad"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  stopColor="#60A5FA"
                />

                <stop
                  offset="100%"
                  stopColor="#BFDBFE"
                />
              </linearGradient>

              <filter id="shadow">
                <feDropShadow
                  dx="0"
                  dy="2"
                  stdDeviation="4"
                  floodColor="#3B82F6"
                  floodOpacity="0.15"
                />
              </filter>
            </defs>

            {/* EDGES */}
            {edges.map((e, i) => (
              <line
                key={`edge-${i}`}
                x1={e.x1}
                y1={e.y1}
                x2={e.x2}
                y2={e.y2}
                stroke="url(#edgeGrad)"
                strokeWidth="3"
                strokeLinecap="round"
              />
            ))}

            {/* NODES */}
            {positions.map((p, i) => {
              const highlighted =
                isHighlighted(p.node.name);

              const hovered =
                hoveredNode === p.node.name;

              return (
                <g
                  key={`node-${i}`}
                  onMouseEnter={() =>
                    setHoveredNode(p.node.name)
                  }
                  onMouseLeave={() =>
                    setHoveredNode(null)
                  }
                  className="transition-all duration-200"
                >
                  {/* NODE */}
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={
                      hovered
                        ? nodeRadius + 5
                        : nodeRadius
                    }
                    fill={
                      highlighted
                        ? "#ECFDF5"
                        : "#FFFFFF"
                    }
                    stroke={
                      highlighted
                        ? "#10B981"
                        : "#3B82F6"
                    }
                    strokeWidth={
                      highlighted ? 4 : 3
                    }
                    filter="url(#shadow)"
                    className="transition-all duration-200"
                  />

                  {/* TITLE */}
                  <text
                    x={p.x}
                    y={p.y - 7}
                    textAnchor="middle"
                    className="text-[11px] font-bold fill-slate-700 pointer-events-none"
                  >
                    {p.node.name.length > 10
                      ? p.node.name.slice(0, 9) +
                      "…"
                      : p.node.name}
                  </text>

                  {/* TYPE */}
                  <text
                    x={p.x}
                    y={p.y + 10}
                    textAnchor="middle"
                    className="text-[9px] fill-slate-400 pointer-events-none"
                  >
                    .{p.node.type}
                  </text>

                  {/* CATEGORY DOT */}
                  <circle
                    cx={p.x}
                    cy={p.y + 23}
                    r={4}
                    fill={getFileCategoryColor(
                      p.node.type
                    )}
                  />

                  {/* TOOLTIP */}
                  {hovered && (
                    <g>
                      <rect
                        x={p.x - 75}
                        y={p.y - 80}
                        width="150"
                        height="38"
                        rx="10"
                        fill="#0F172A"
                        opacity="0.95"
                      />

                      <text
                        x={p.x}
                        y={p.y - 56}
                        textAnchor="middle"
                        className="text-[11px] fill-white font-medium"
                      >
                        {p.node.name}.
                        {p.node.type}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>
        )}
      </div>

      {/* LEGEND */}
      {tree && (
        <div className="flex items-center gap-5 px-5 py-3 border-t border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <div className="w-3 h-3 rounded-full border-2 border-blue-500 bg-white" />

            <span>Node</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <div className="w-3 h-3 rounded-full border-2 border-emerald-500 bg-emerald-50" />

            <span>Search Result</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <div className="w-8 h-0.5 bg-gradient-to-r from-blue-300 to-blue-200 rounded" />

            <span>Edge</span>
          </div>
        </div>
      )}
    </div>
  );
}