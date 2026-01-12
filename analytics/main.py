from fastapi import FastAPI, Body
from datetime import timedelta
import pandas as pd

app = FastAPI()

@app.post("/analyze")
async def analyze_reports(reports: list = Body(...)):
    if not reports:
        return []

    df = pd.DataFrame(reports)

    # Convert createdAt to timezone-naive datetime
    df["createdAt"] = pd.to_datetime(df["createdAt"], utc=True).dt.tz_localize(None)

    # Use datetime instead of date
    latest_datetime = df["createdAt"].max()
    seven_days_ago = latest_datetime - timedelta(days=7)

    results = []

    for pincode, group in df.groupby("pincode"):
        today_cases = group[group["createdAt"].dt.date == latest_datetime.date()]
        last_7_days = group[group["createdAt"] >= seven_days_ago]

        avg_cases = len(last_7_days) / 7 if len(last_7_days) > 0 else 0

        risk = "Low"
        if len(today_cases) > avg_cases * 2:
            risk = "High"
        elif len(today_cases) > avg_cases:
            risk = "Medium"

        results.append({
            "pincode": pincode,
            "lat": group.iloc[0]["lat"],
            "lng": group.iloc[0]["lng"],
            "todayCases": len(today_cases),
            "avgCases": round(avg_cases, 2),
            "risk": risk
        })

    return results
