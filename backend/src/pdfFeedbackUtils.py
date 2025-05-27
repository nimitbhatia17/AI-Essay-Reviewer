import os
import PyPDF2
from openai import OpenAI

from dotenv import load_dotenv, find_dotenv

_ = load_dotenv(find_dotenv())

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY"),
)

system_message = """
    You are a professional college applications consultant and an expert essay reviewer. You have read the book "The College Application Essay" by Sarah Myers McGinty. You are given the task of evaluating a given essay and providing feedback on it.
"""


def generate_prompt(essay, book):
    prompt = f"""
    Imagine you are a professional college applications consultant and an expert essay reviewer. You have read the book {book}. Now you are given the task of evaluating a given essay and providing feedback on it.

    Do this task by utmost sincerity and dilligence. You are not allowed to make any assumptions about the essay. You are not allowed to make any assumptions about the author of the essay. You are not allowed to make any assumptions about the college or university that the author is applying to. You are not allowed to make any assumptions about the author's background. You are not allowed to make any assumptions about the author's family. You are not allowed to make any assumptions about the author's friends. You are not allowed to make any assumptions about the author's school. You are not allowed to make any assumptions about the author's teachers. You are not allowed to make any assumptions about the author's classmates. You are not allowed to make any assumptions about the author's extracurricular activities. You are not allowed to make any assumptions about the author's hobbies. You are not allowed to make any assumptions about the author's interests. You are not allowed to make any assumptions about the author's passions. You are not allowed to make any assumptions about the author's goals. You are not allowed to make any assumptions about the author's dreams. You are not allowed to make any assumptions about the author's aspirations. You are not allowed to make any assumptions about the author's future plans.

    Given the essay text below.

    {essay}
    """


def get_feedback(essay, book):
    prompt = generate_prompt(essay, book)
    response = client.chat.completions.create(
        model=model,
        messages=[
            {"role": "system", "content": system_message},
            {"role": "user", "content": prompt}
        ],
        temperature=temperature,
        max_tokens=max_tokens
    )
    return response.choices[0].message.content


model = "gpt-3.5-turbo"
temperature = 0.3
max_tokens = 500
topic = ""

book = ""
file_path = "./src/data/essay_reference_book.pdf"
with open(file_path, "rb") as file:
    reader = PyPDF2.PdfReader(file)
    text = ""
    for page in reader.pages:
        text += page.extract_text()
    book = text

feedback = get_feedback("", book)
print(feedback)
