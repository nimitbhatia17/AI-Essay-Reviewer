import pandas as pd
import json

PATH_TO_WHARTON_CSV = "/Users/nimitbhatia/Projects/EssayReview/backend/src/data/wharton_reports_wharton-mba-course-list.csv"


def main():
    df = pd.read_csv(PATH_TO_WHARTON_CSV)
    json_list = json.loads(df.to_json(orient="records"))
    print(json_list[0:3])
    return


if __name__ == "__main__":
    main()
