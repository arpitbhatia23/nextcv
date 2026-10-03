import { Card, CardContent } from "@/shared/components/ui/card";
import { PostmarkBadge } from "./postmarkBadge";
import {
  Download,
  Edit2,
  FileText,
  LayoutDashboard,
  MoreVertical,
  Share2,
  Trash2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { Button } from "@/shared/components/ui/button";
import { getTemplateByName } from "../services/templateMap";

const ResumeCard = ({
  resume,
  onPreview,
  onDownload,
  onEdit,
  onDelete,
  onShare,
  onSharePortfolio,
  getTemplateDisplayName,
}) => {
  const templateTier = getTemplateByName(resume?.ResumeType)?.tier?.toLowerCase();
  const isPaid = resume?.status === "paid";
  const isPremiumOrElite = isPaid && (templateTier === "premium" || templateTier === "elite");
  const isElite = isPaid && templateTier === "elite";

  return (
    <Card
      className="group relative border rounded-2xl shadow-[0_2px_12px_rgba(23,32,28,0.06)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(23,32,28,0.10)] overflow-hidden"
      style={{ backgroundColor: "#FFFFFF", borderColor: "#E3E2DC" }}
    >
      <PostmarkBadge status={resume.status} />
      <CardContent className="p-0">
        {/* Preview area */}
        <div
          className="p-6 flex items-center justify-center h-40 relative overflow-hidden cursor-pointer"
          style={{ backgroundColor: "#F8F7F3" }}
          onClick={() => onPreview(resume)}
        >
          <FileText
            className="w-10 h-10 transition-colors duration-200"
            style={{ color: "#C9C7BF" }}
            strokeWidth={1.25}
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 bg-[#17201C]/5">
            <span
              className="px-4 py-2 text-xs font-medium rounded-lg border transition-colors"
              style={{
                backgroundColor: "#FFFFFF",
                borderColor: "#E3E2DC",
                color: "#17201C",
              }}
            >
              Open Preview
            </span>
          </div>
        </div>

        {/* Subtle divider */}
        <div className="h-px w-full" style={{ backgroundColor: "#E3E2DC" }} />

        <div className="px-5 py-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h2
                className="text-sm font-semibold truncate leading-snug"
                style={{ color: "#17201C" }}
                title={resume.name}
              >
                {resume.name || "Untitled Resume"}
              </h2>
              <p className="text-xs truncate mt-0.5" style={{ color: "#66706B" }}>
                {getTemplateDisplayName(resume.ResumeType)}
              </p>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 -mr-1.5 rounded-lg hover:bg-[#F1F0EB] transition-colors"
                  style={{ color: "#8A908B" }}
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52 rounded-xl border-[#E3E2DC]">
                <DropdownMenuItem onClick={() => onDownload(resume)} className="rounded-lg text-sm">
                  <Download className="mr-2 h-4 w-4 text-[#66706B]" />
                  <span style={{ color: "#17201C" }}>Download PDF</span>
                </DropdownMenuItem>

                {/* Share Resume Link — Premium + Elite */}
                {isPremiumOrElite && (
                  <DropdownMenuItem
                    onClick={() => onShare && onShare(resume)}
                    className="rounded-lg text-sm"
                  >
                    <Share2 className="mr-2 h-4 w-4 text-[#465B9E]" />
                    <span style={{ color: "#17201C" }}>Share Resume Link</span>
                  </DropdownMenuItem>
                )}

                {/* Share Portfolio — Elite only */}
                {isElite && (
                  <DropdownMenuItem
                    onClick={() => onSharePortfolio && onSharePortfolio(resume)}
                    className="rounded-lg text-sm"
                  >
                    <LayoutDashboard className="mr-2 h-4 w-4 text-[#465B9E]" />
                    <span style={{ color: "#17201C" }}>
                      Share Portfolio{" "}
                      <span className="text-[10px] font-bold text-[#465B9E] ml-1">ELITE</span>
                    </span>
                  </DropdownMenuItem>
                )}

                <DropdownMenuItem
                  onClick={() => onEdit(resume?._id)}
                  className="rounded-lg text-sm"
                >
                  <Edit2 className="mr-2 h-4 w-4 text-[#66706B]" />
                  <span style={{ color: "#17201C" }}>Edit Resume</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-[#E3E2DC]" />
                <DropdownMenuItem
                  onClick={() => onDelete(resume._id)}
                  className="rounded-lg text-sm text-red-600 focus:text-red-600 focus:bg-red-50"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Bottom bar — REF + share quick action */}
          <div
            className="mt-3 pt-3 border-t flex items-center justify-between"
            style={{ borderColor: "#E3E2DC" }}
          >
            <span className="font-mono text-[10px] tracking-wide" style={{ color: "#8A908B" }}>
              REF · {(resume?._id || "0000").toString().slice(-6).toUpperCase()}
            </span>

            {/* Elite: show both SHARE + PORTFOLIO. Premium: SHARE only. Otherwise: date. */}
            {isElite ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={e => {
                    e.stopPropagation();
                    onShare?.(resume);
                  }}
                  className="inline-flex items-center gap-1 font-mono text-[10px] transition-colors cursor-pointer"
                  style={{ color: "#465B9E" }}
                  title="Share resume link"
                >
                  <Share2 className="w-3 h-3" />
                  SHARE
                </button>
                <span style={{ color: "#E3E2DC" }}>|</span>
                <button
                  onClick={e => {
                    e.stopPropagation();
                    onSharePortfolio?.(resume);
                  }}
                  className="inline-flex items-center gap-1 font-mono text-[10px] font-bold transition-colors cursor-pointer"
                  style={{ color: "#344B93" }}
                  title="Share portfolio page (Elite)"
                >
                  <LayoutDashboard className="w-3 h-3" />
                  PORTFOLIO
                </button>
              </div>
            ) : isPremiumOrElite ? (
              <button
                onClick={e => {
                  e.stopPropagation();
                  onShare?.(resume);
                }}
                className="inline-flex items-center gap-1 font-mono text-[10px] transition-colors cursor-pointer"
                style={{ color: "#465B9E" }}
                title="Share public link"
              >
                <Share2 className="w-3 h-3" />
                SHARE
              </button>
            ) : (
              <span className="font-mono text-[10px]" style={{ color: "#8A908B" }}>
                {new Date(resume?.updatedAt || resume?.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResumeCard;
