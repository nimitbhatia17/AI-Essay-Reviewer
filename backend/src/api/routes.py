from fastapi import APIRouter, Request, UploadFile, File, Form
import pandas as pd
import json
import os
from dotenv import load_dotenv, find_dotenv
from openai import OpenAI
import markdown

router = APIRouter()

df = pd.read_csv(
    "src/data/deep_essays_dataset.csv")

_ = load_dotenv(find_dotenv())

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY"),
)

system_message = """
    You are a professional college applications consultant and an expert essay reviewer. You have read the book "Great Application Essays for Business School" by Paul Bodine. You are given the task of evaluating a given essay and providing feedback on it.
"""


def get_feedback(essay):
    model = "gpt-3.5-turbo"
    temperature = 0.3
    max_tokens = 4000

    prompt = f"""
    Imagine you are a professional college applications consultant and an expert essay reviewer. You have read the sample essay which was accepted in Wharton. This is that essay topic: "How do you plan to use the Wharton MBA program to help you achieve your future professional goals? You might consider your past experience, short and long-term goals, and resources available at Wharton. (500 words)"

    Now the first paragraph of the essay should be the hook. The hook should be a personal story that is relevant to the essay topic. The hook should be followed by a credibility statement, which explains why the author is qualified to write about this topic and potentially solve the problem. This paragraph should end with some inflexion which informs how the candidate wants to solve the problem or identifies the white space in the mission statement. The credibility statement should be followed by a short-term goal, which is a specific and measurable goal that the author wants to achieve in the next 1-2 years. The short-term goal should be followed by a long-term goal, which is a broader and more ambitious goal that the author wants to achieve in the next 5-10 years. The long-term goal should be followed by an introduction to the skill gaps, which are the skills that the author needs to develop in order to achieve their goals. Each skill gap paragraph should start with an experience that is anchored to the skill gap. The resources should progress to a higher skill level. So we identify sub-skills and mention resources for each sub-skill which is mentioned in progression in terms of level. Finally, the essay should end with a punch line that summarizes the author's vision and how Wharton MBA will help them achieve it. All the paragraphs should be connected and flow logically from one to the next. The essay should be well-structured and easy to read. The author should use clear and concise language, and avoid jargon or technical terms that may not be familiar to the reader. The author should also avoid using cliches or overused phrases, and instead use original and creative language that reflects their unique voice and perspective. The author should also be mindful of the word count, and ensure that the essay is within the specified limit of 500 words. The essay should be engaging and compelling, and leave a lasting impression on the reader.

    The essay text is below.

    “Globally, 4.3M children might die before the age of 5 due to health hazards in overcrowded slums.

    My father spent his childhood surrounded by dingy walls of a crowded house in Amritsar, an Indian tier-2 city. Struggling to balance his time between studying, fetching clean-water and locating a pit-latrine to relieve himself, he worked tirelessly to improve his living conditions. While he eventually moved to Delhi, there are ~1B people globally who still live in informal settlements, largely concentrated in Asia and Africa. In addition to financial stress, they suffer from health issues owing to lack of access to clean-water and sanitation, and poor healthcare.

    At Bain, I collaborated with investors to drive funding towards healthtech ventures that automate clinical processes and accelerate R&D to bolster health outcomes for 350M+ patients globally. While at Sanergy, I focused my efforts towards the health outcomes of 1M+ people living in informal settlements of each of 20 African cities by advancing container-based sanitation in collaboration with government WASH Directors. While tech-based startups can amplify their impact post-funding, government-dependent social-enterprises often face significant hurdles in the form of low institutional capacity, budgetary constraints and inertia, hindering tech adoption and innovation, jeopardizing the health of millions.

    Hence, post-MBA, I aim to work in the impact-consulting arm of McKinsey, BCG or Bain, synergising government, social-enterprises and impact-investors to scale digital/tech initiatives such as GIS/smart metering, that improve access to healthcare and financial services for the urban-poor. Long term, I aspire to start my own advisory firm helping social-tech enterprises and investors in Asia and Africa to navigate regulatory hurdles and unlock $260B in global economic productivity through better health and financial outcomes.

    Wharton's vision of educating “pillars of the State” makes it the ideal place for me to strengthen the skills needed to realize my vision - understanding viable social-impact models, navigating political risks and resistance to change, and driving private investment.

    Every skill gap paragraph starts with an experience which is anchored to the skill gap. The resources should progress to a higher skill level. So we identify sub skills and mention resources for each sub skill which is mentioned in progression in terms of level.
    
    Contrasting my experience of formulating expansion strategies for a SaaS music distributor app at Bain and low-cost sanitation services at Sanergy, I realized how social enterprises typically face an acute shortage of resources that can limit their growth avenues. Name'22 suggested taking “Social Entrepreneurship” to understand how to maximize social impact while generating financial returns. I will supplement this with Prof. XYZ's “Technology Strategy” to learn commercialization strategies for social-tech initiatives that tackle global issues such as climate change. Name'22 recommended practicing these skills through the “WISE Fellowship” where I can help initiatives like FastFWD work with the government to promote public safety in Philadelphia.

    Collaborating with African governments to bring basic sanitation to informal settlements, I realized how their financial constraints and reluctance to change has necessitated adaptation of Sanergy's model to different landscapes. Through “Urban Fiscal Policy”, I will learn how to drive robust fiscal policies to create efficient cities for my government clients. Name'22 mentioned how “Influence” by Prof. Massey can equip me with tools to overcome resistance to change among government officials. Name'22 recommended joining “Global Modular Courses” on technology and social impact in Asian and African regions to learn more about region-specific landscapes.

    Partnering with Bain's PE clients across the globe to promote investment in sustainable tech and emerging markets, I understood how impact investors' financial muscle can accelerate progress towards SDGs. Name'22 recalls taking Prof. Geczy's “Impact Investing” class to understand investment approaches and challenges faced by impact investors. Name'22 emphasized joining “Wharton Impact Venture Associates” to facilitate investment and mentorship for healthtech enterprises such as InnaMed.

    Wharton MBA will help me unite social-enterprises, government stakeholders and impact-investors to alleviate the conditions of the urban poor, achieving our SDG targets by 2030."
    
    Now you are given the task of evaluating a given essay and providing feedback on it.

    Do this task by utmost sincerity and dilligence. You are not allowed to make any assumptions about the essay. You are not allowed to make any assumptions about the author of the essay. You are not allowed to make any assumptions about the college or university that the author is applying to. You are not allowed to make any assumptions about the author's background. You are not allowed to make any assumptions about the author's family. You are not allowed to make any assumptions about the author's friends. You are not allowed to make any assumptions about the author's school. You are not allowed to make any assumptions about the author's teachers. You are not allowed to make any assumptions about the author's classmates. You are not allowed to make any assumptions about the author's extracurricular activities. You are not allowed to make any assumptions about the author's hobbies. You are not allowed to make any assumptions about the author's interests. You are not allowed to make any assumptions about the author's passions. You are not allowed to make any assumptions about the author's goals. You are not allowed to make any assumptions about the author's dreams. You are not allowed to make any assumptions about the author's aspirations. You are not allowed to make any assumptions about the author's future plans.

    Given the essay text below.

    {essay}
    """

    response = client.chat.completions.create(
        model=model,
        messages=[
            {"role": "system", "content": system_message},
            {"role": "user", "content": prompt}
        ],
        temperature=temperature,
        max_tokens=max_tokens
    )
    html = markdown.markdown(response.choices[0].message.content)
    print(html)
    return html


@router.get("/colleges")
async def getCollegeList():
    return ["Harvard", "Stanford", "MIT", "Yale", "Princeton", "Columbia", "UChicago", "Caltech", "Duke", "Northwestern"]


@router.post("/search")
async def search(request: Request):
    body = json.loads(await request.body())
    queried_df = df[df['title'] == body.get(
        "query")][['id', 'title', 'description', 'essay', 'authors']]
    queried_df = queried_df.rename(columns={
        'id': 'essay_id',
        'title': 'essay_title',
        'description': 'essay_description',
        'essay': 'essay_text',
        'authors': 'essay_authors'
    })
    dictionary = queried_df.to_dict(orient='records')
    return dictionary


@router.get("/essay")
async def getEssay(request: Request):
    essay_id = int(request.query_params.get("id"))
    queried_df = df[df['id'] == essay_id][[
        'id', 'title', 'description', 'essay', 'authors']]
    queried_df = queried_df.rename(columns={
        'id': 'essay_id',
        'title': 'essay_title',
        'description': 'essay_description',
        'essay': 'essay_text',
        'authors': 'essay_authors'
    })
    dictionary = queried_df.to_dict(orient='records')
    return dictionary


@router.post("/feedback")
async def upload_essay(file: UploadFile = File(...), college: str = Form(...)):
    file_bytes = await file.read()
    save_dir = "uploads"
    os.makedirs(save_dir, exist_ok=True)

    file_path = os.path.join(save_dir, file.filename)
    with open(file_path, "wb") as f:
        f.write(file_bytes)

    essay = """
    1 in 7 teens struggle with mental health challenges, and many more indulge in unhealthy practices, yet over 75 percent of these cases go unnoticed, often dismissed as “typical-teenage-behavior”. Growing up, I was bullied, labeled “kaali” (dark-skinned, in Hindi) adding to my existing battles - in a household where my mother sought to create stability amid my father's mental health challenges. As a school teacher, she'd often say reassuringly: “You're perfect” or “Not all fathers are meant to work. ”Realizing how lucky I was to have strong psychological support growing up which many teenagers in our world of increasing social media pressures lack, I organized mental health awareness camps for students and parents across 20+ schools in Indore.

    Years later, at Premji Invest, I realized the power of brands to challenge deeply ingrained, unhealthy ideals like skin fairness, ozempic-inspired bodies, while helping long-standing brands like FabIndia choose a different path. T o reassert branding in the youth market, we launched a nationwide “Unapologetically-You” campaign, highlighting body positivity, and sustainable clothing, increasing footfalls by 70%. Expanding my scope, I steered Premji Invest's expansion into Consumertech, investing in and scaling brands like GIVA, by automating store roll-outs, opening 73 stores within 1-yr, and as a result widening the cordoned off 'who-do-you-know' Indian jewelry market. At Lightrock, while helping brands like Waycool stay afloat, I witnessed the importance of strong data-backed operations, realizing that combining business with values while driving success will always be challenging.

    My long-term vision is to embrace this difficult path by launching an operations-focused investment fund that harnesses brands' influence to address the myriad challenges adolescents are increasingly facing. I aspire to incubate brands and tech-platforms prioritizing self-love and confidence among adolescents while supporting lofty missions with ground-level operational support through advisors and centralized 'value-creation' teams. T owards this post-MBA, I'll join a consumer-focused fund like Warburg or Forerunner Ventures to create their 'responsible-brands-practice, ' scale and reshape portfolios into forward-thinking enterprises.

    At Wharton, I'll major in 'Strategic-Management' and 'Marketing' to become an innovative portfolio manager and investor. Reforming markets to support adolescent well-being will require persistent effort to persuade and collaborate. Shubhra Agrawal('25) recommended 'Influence' to build advocacy for my vision - 'ConsumerT ech-with-Purpose' . Through 'Advanced-Negotiations' and Environmental-Sustainability-and-Value-Creation' I'll explore the recent ESG backlash, seeking to repurpose what it can unanimously mean for the business world. Stepping into founders' shoes in 'Management-of-Emerging-Enterprises' I'll learn to formalize strategies and organizational processes. I'll apply strategic alignment models from Microsoft's purpose-driven transformation case in 'Strategy-Implementation' to transition portfolios into responsible brands while interning at First Round Capital.

    Reading 'Think-Again' inspired me to reassess outdated portfolio strategies. I wish to learn behavioral science strategies for crafting responsible, effective engagement tactics. Unnishankar('25) recommended 'Strategic-Brand-Management' to explore how innovative brand managers connect with customers. Networking with startups like AllBirds during SSF , I'll understand the challenges of positioning ethical products in competitive markets.

    From challenging myself through 'The-Antarctica-Expedition' to introspecting through ECFP , Wharton's experiential, multidisciplinary curriculum will empower me to create a healthier, happier future for 1.2Bn adolescents globally
"""

    feedback = get_feedback(essay)

    response = {'feedback': feedback}
    return response
