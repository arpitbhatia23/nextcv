import { useState, useEffect } from "react";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function DataTableSection({ icon: Icon, title, type, columns, emptyMessage, LINE }) {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isCurrentRequest = true;

    const fetchPage = async () => {
      setLoading(true);
      setError(false);
      try {
        const response = await axios.get("/api/analytics/recentRecords", {
          params: { type, page },
        });
        if (isCurrentRequest) {
          const result = response?.data?.data;
          const pages = result?.totalPages || 0;
          if (page > Math.max(pages, 1)) {
            setPage(Math.max(pages, 1));
            return;
          }
          setRows(result?.rows || []);
          setTotal(result?.total || 0);
          setTotalPages(pages);
        }
      } catch (requestError) {
        console.error(`Failed to load ${type} records:`, requestError);
        if (isCurrentRequest) setError(true);
      } finally {
        if (isCurrentRequest) setLoading(false);
      }
    };

    fetchPage();
    return () => {
      isCurrentRequest = false;
    };
  }, [page, type]);

  const firstRecord = total ? (page - 1) * 8 + 1 : 0;
  const lastRecord = Math.min(page * 8, total);

  return (
    <section
      className="min-w-0 rounded-2xl border shadow-[0_2px_12px_rgba(23,32,28,0.04)] overflow-hidden"
      style={{ borderColor: LINE, backgroundColor: "#FFFFFF" }}
    >
      <div
        className="flex items-center justify-between gap-3 border-b px-4 sm:px-6 py-3.5 bg-[#F8F7F3]/40"
        style={{ borderColor: LINE }}
      >
        <h3 className="flex items-center gap-2 font-sans text-xs sm:text-sm font-semibold text-[#17201C]">
          <Icon className="h-4 w-4 text-[#465B9E]" />
          {title}
        </h3>
        <span className="font-mono text-[10px] text-[#8A908B] px-2 py-0.5 rounded-full bg-white border border-[#E3E2DC]">
          {total.toLocaleString()} RECORDS
        </span>
      </div>
      {rows.length ? (
        <div className="overflow-x-auto">
          <table className="w-full min-w-150 border-collapse text-left">
            <thead>
              <tr className="border-b bg-[#F8F7F3]/60" style={{ borderColor: LINE }}>
                {columns.map(column => (
                  <th
                    key={column.key}
                    className="px-4 sm:px-5 py-3 font-mono text-[9px] font-medium tracking-wider text-[#66706B]"
                  >
                    {column.label.toUpperCase()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E3E2DC]">
              {rows.map((row, index) => (
                <tr
                  key={row._id || row.slug || index}
                  className="hover:bg-[#F8F7F3]/30 transition-colors"
                >
                  {columns.map(column => (
                    <td key={column.key} className="px-4 sm:px-5 py-3.5 text-xs text-[#17201C]">
                      {column.render(row)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : loading ? (
        <p className="px-4 py-8 text-center font-mono text-xs tracking-wider animate-pulse text-[#66706B]">
          LOADING RECORDS...
        </p>
      ) : error ? (
        <p className="px-4 py-8 text-center font-mono text-xs tracking-wider text-amber-800">
          COULD NOT LOAD RECORDS
        </p>
      ) : (
        <p className="px-4 py-8 text-center font-mono text-xs tracking-wider text-[#8A908B]">
          {emptyMessage}
        </p>
      )}
      <div
        className="flex items-center justify-between gap-3 border-t px-4 sm:px-6 py-3 bg-[#F8F7F3]/30"
        style={{ borderColor: LINE }}
      >
        <span className="font-mono text-[10px] tracking-wide text-[#66706B]">
          {firstRecord}–{lastRecord} OF {total.toLocaleString()}
        </span>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] text-[#8A908B]">
            PAGE {totalPages ? page : 0} / {totalPages}
          </span>
          <button
            type="button"
            aria-label={`Previous ${title.toLowerCase()} page`}
            title="Previous page"
            onClick={() => setPage(currentPage => Math.max(1, currentPage - 1))}
            disabled={page <= 1 || loading}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E3E2DC] text-[#17201C] bg-white hover:bg-[#F1F0EB] transition-colors disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label={`Next ${title.toLowerCase()} page`}
            title="Next page"
            onClick={() => setPage(currentPage => Math.min(totalPages, currentPage + 1))}
            disabled={page >= totalPages || loading}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E3E2DC] text-[#17201C] bg-white hover:bg-[#F1F0EB] transition-colors disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
