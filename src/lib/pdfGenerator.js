import { templates } from "@/utils/template";
import { pdf } from "@react-pdf/renderer";
import { pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

export class pdfGenerator {
  constructor(resumeData, selectedTemplate) {
    this.resumeData = resumeData;
    this.selectedTemplate = selectedTemplate;
    this.url = null;
  }
  async createPdf() {
    const selectedTemplate = templates.find(
      (t) => t.key == (this.selectedTemplate || this.resumeData.ResumeType),
    );
    if (!selectedTemplate) {
      throw new Error("Template not found");
    }

    const TemplateComponent = selectedTemplate.component;
    const blob = await pdf(
      <TemplateComponent data={this.resumeData} />,
    ).toBlob();
    const url = URL.createObjectURL(blob);
    this.url = url;
    return url;
  }
  async downloadPdf() {
    if (!this.url) {
      await this.createPdf();
    }

    const link = document.createElement("a");
    link.href = this.url;
    link.download = `${this.resumeData.name || "resume"}.pdf`;
    link.click();

    setTimeout(() => {
      this.cleanUp();
    }, 8000);
  }

  cleanUp() {
    if (this.url) {
      URL.revokeObjectURL(this.url);
      this.url = null;
    }
  }
}
