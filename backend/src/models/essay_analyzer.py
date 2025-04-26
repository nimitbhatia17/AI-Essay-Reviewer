# # src/models/essay_analyzer.py
# import spacy
# from sentence_transformers import SentenceTransformer
# import json
# import os
# from pathlib import Path

# # Load spaCy model
# nlp = spacy.load("en_core_web_sm")

# # Load Sentence-BERT model for embeddings
# model = SentenceTransformer("all-MiniLM-L6-v2")

# # Load dataset
# DATA_PATH = Path(__file__).parent.parent / "data" / "essays.json"
# with open(DATA_PATH, "r") as f:
#     dataset = json.load(f)


# def analyze_essay(text: str, college: str) -> dict:
#     # Basic NLP analysis with spaCy
#     doc = nlp(text)
#     word_count = len([token for token in doc if not token.is_punct])
#     # Simple proxy for sentence length
#     readability = len(doc) / (len([sent for sent in doc.sents]) or 1)

#     # Generate embedding for the essay
#     essay_embedding = model.encode(text)

#     # Find college-specific essays in dataset
#     college_essays = [
#         entry for entry in dataset if entry["college_accepted"].lower() == college.lower()]
#     if not college_essays:
#         return {
#             "error": f"No data found for {college}",
#             "word_count": word_count,
#             "readability": readability,
#         }

#     # Compare to college essays (simple cosine similarity)
#     college_embeddings = [model.encode(entry["text"])
#                           for entry in college_essays]
#     similarities = [model.similarity(
#         essay_embedding, college_emb).item() for college_emb in college_embeddings]
#     avg_similarity = sum(similarities) / len(similarities)

#     # Generate feedback based on dataset annotations
#     feedback = {
#         "word_count": word_count,
#         "readability": readability,
#         "similarity_to_accepted": avg_similarity,
#         # Example theme extraction
#         "themes": [ent.text for ent in doc.ents if ent.label_ in ["PERSON", "ORG", "GPE"]],
#         # Placeholder
#         "suggestions": ["Add specific examples to strengthen narrative"],
#     }

#     return feedback
