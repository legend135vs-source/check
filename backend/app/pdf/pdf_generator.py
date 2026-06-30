from app.domain.entities.report import ReportEntity
from app.domain.interfaces.i_pdf_generator import IPDFGenerator
from app.pdf.report_builder import ReportBuilder
from app.core.config import settings


class PDFGenerator(IPDFGenerator):
    async def generate(self, report: ReportEntity) -> bytes:
        builder = ReportBuilder(report)
        html = builder.build_html()
        if settings.PDF_ENGINE == "weasyprint":
            return self._render_weasyprint(html)
        return self._render_reportlab(report)

    def _render_weasyprint(self, html: str) -> bytes:
        from weasyprint import HTML
        return HTML(string=html).write_pdf()

    def _render_reportlab(self, report: ReportEntity) -> bytes:
        from reportlab.pdfgen import canvas
        from io import BytesIO
        buf = BytesIO()
        c = canvas.Canvas(buf)
        c.drawString(100, 750, f"AI Vehicle Inspector Report")
        c.drawString(100, 730, f"VIN: {report.vin or 'N/A'}")
        if report.risk_score is not None:
            c.drawString(100, 710, f"Risk Score: {report.risk_score}/10")
        c.save()
        return buf.getvalue()
