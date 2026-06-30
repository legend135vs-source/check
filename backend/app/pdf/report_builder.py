from app.domain.entities.report import ReportEntity


class ReportBuilder:
    def __init__(self, report: ReportEntity):
        self.report = report

    def build_html(self) -> str:
        sections = [
            self._cover(),
            self._technical_specs(),
            self._auction_history(),
            self._damage_analysis(),
            self._ai_conclusions(),
            self._buying_checklist(),
        ]
        body = "\n".join(sections)
        return f"""<!DOCTYPE html>
<html lang='en'>
<head>
<meta charset='UTF-8'>
<style>
  body {{ font-family: Arial, sans-serif; margin: 40px; color: #1a1a1a; }}
  h1 {{ color: #01696f; border-bottom: 2px solid #01696f; padding-bottom: 8px; }}
  h2 {{ color: #333; margin-top: 32px; }}
  .risk-badge {{ display: inline-block; padding: 6px 16px; border-radius: 20px;
    font-weight: bold; font-size: 18px; }}
  .risk-low {{ background: #d4dfcc; color: #1e3f0a; }}
  .risk-mid {{ background: #e9e0c6; color: #8a5b00; }}
  .risk-high {{ background: #e0ced7; color: #561740; }}
  table {{ width: 100%; border-collapse: collapse; margin-top: 12px; }}
  th, td {{ border: 1px solid #ddd; padding: 8px 12px; text-align: left; }}
  th {{ background: #f0f0f0; }}
</style>
</head>
<body>
{body}
</body>
</html>"""

    def _cover(self) -> str:
        vd = self.report.vin_data
        make = vd.make if vd else "Unknown"
        model = vd.model if vd else "Unknown"
        year = vd.year if vd else "Unknown"
        risk = self.report.risk_score or 0
        risk_class = "risk-low" if risk < 4 else "risk-mid" if risk < 7 else "risk-high"
        return f"""
<h1>AI Vehicle Inspector Report</h1>
<p><strong>VIN:</strong> {self.report.vin or 'N/A'}</p>
<p><strong>Vehicle:</strong> {year} {make} {model}</p>
<p><strong>Risk Score:</strong>
  <span class='risk-badge {risk_class}'>{risk}/10</span>
</p>
"""

    def _technical_specs(self) -> str:
        vd = self.report.vin_data
        if not vd:
            return "<h2>Technical Specifications</h2><p>No data available.</p>"
        rows = ""
        for field, label in [
            ("make", "Make"), ("model", "Model"), ("year", "Year"),
            ("body_type", "Body Type"), ("engine", "Engine"),
            ("fuel_type", "Fuel Type"), ("transmission", "Transmission"),
            ("drive_type", "Drive Type"), ("country_of_manufacture", "Origin"),
        ]:
            value = getattr(vd, field, None) or "N/A"
            rows += f"<tr><th>{label}</th><td>{value}</td></tr>"
        return f"<h2>Technical Specifications</h2><table>{rows}</table>"

    def _auction_history(self) -> str:
        if not self.report.auction_records:
            return "<h2>Auction History</h2><p>No auction records found.</p>"
        rows = ""
        for r in self.report.auction_records:
            rows += f"""<tr>
              <td>{r.auction_name or 'N/A'}</td>
              <td>{r.sale_date or 'N/A'}</td>
              <td>{r.odometer_km or 'N/A'}</td>
              <td>{r.primary_damage or 'None'}</td>
              <td>${r.sale_price_usd or 'N/A'}</td>
            </tr>"""
        header = "<tr><th>Auction</th><th>Date</th><th>Odometer</th><th>Damage</th><th>Price</th></tr>"
        return f"<h2>Auction History</h2><table>{header}{rows}</table>"

    def _damage_analysis(self) -> str:
        if not self.report.photo_analyses:
            return "<h2>Damage Analysis</h2><p>No photos provided.</p>"
        items = ""
        for p in self.report.photo_analyses:
            status = "Damage detected" if p.damage_detected else "No damage"
            desc = p.damage_description or ""
            items += f"<li><strong>{status}</strong>: {desc}</li>"
        return f"<h2>Damage Analysis</h2><ul>{items}</ul>"

    def _ai_conclusions(self) -> str:
        summary = self.report.ai_summary or "AI analysis not available."
        return f"<h2>AI Conclusions</h2><p>{summary}</p>"

    def _buying_checklist(self) -> str:
        items = [
            "Verify VIN matches all vehicle documents",
            "Check for open recalls on NHTSA website",
            "Inspect undercarriage for rust or previous repairs",
            "Test all electronics and safety systems",
            "Verify service history with dealership",
            "Have an independent mechanic inspect before purchase",
            "Check title for salvage/flood/hail designations",
            "Compare odometer with auction records",
        ]
        checklist = "".join(f"<li>&#9744; {item}</li>" for item in items)
        return f"<h2>Buying Checklist</h2><ul>{checklist}</ul>"
