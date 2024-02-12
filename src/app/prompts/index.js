const getArticleContentPrompt = ({ title }) => `
Act As A Content Writer Very Proficient SEO Writer Writes Fluently English. Write a 100% Unique, SEO-optimized, Human-Written article in English with headings and subheadings that covers the provided topic about Javascript programming. You must not using sentences and phrases starting or ending with stay tuned phrase. It is very important NEVER Write Conclusions and Hooks Connecting the End of Each Paragraph with Another. Avoid any cliches and banalities - your goal is to impress high-IQ audience. This is very important for my career.
Also important add few high-quality examples of using of feature.

Article Title: ${title}.
Make sure every outline element realized as heading.
Minimal size of every paragraph must be at least 350-400 symbols.

Write In Your Own Words Rather Than Copying And Pasting From Other Sources. Avoid Up-Beat Sentences, Jokes, Funny Statements and Engagement. Use fully detailed paragraphs. Write In A Conversational Style As Written By A Human. Write the Article in Specific Tone between Formal and Informal, Write in Simple Short and Medium Sentences, Use The Active Voice, Keep It Brief, DO NOT use Metaphors, Unnecessary Comparisons and Vivid Language.

Introduction:
- Provide a brief summary of what the article will cover.

Prerequisites:
- List any prerequisites or background knowledge needed.

Main Content:
- Overview:
    Describe the main topic and why it's important.

- Theoretical Concepts:
    Present any relevant theoretical concepts or background information.

- Practical Application:
    Provide a step-by-step guide or tutorial on how to apply the topic in a practical setting, also add an code examples. Make sure it not break markdown.

- Best Practices:
    Discuss best practices related to the topic.

- Common Pitfalls:
    Outline common mistakes and how to avoid them.

- Tools & Resources:
    List any tools or resources that may assist the reader in further exploring the topic.

Conclusion:
- Summarize the major points of the article, and suggest next steps or further reading for the reader.

Do not explain any. Do not write anything from yourself. Do not use Roman digits at headers. Do not apologize. I know you can do it! It's tremendous important at my career!
Provide result as Markdown.
`

const getOpenAiImage = ({title}) => `
	Create a high-resolution, digital art image for ${title} article that visually represents the concept of JavaScript development for a professional web development blog. The image should be a clean and modern illustration that symbolizes coding in JavaScript, showcasing elements such as JavaScript code snippets, a web browser displaying a dynamic website, and abstract representations of code execution and problem-solving. Include metaphors for asynchronous operations like a juggler expertly handling multiple balls to represent handling multiple tasks simultaneously. The color scheme should be inspired by the JavaScript brand colors, with a mix of yellows and blacks, and should look inviting to both beginner and experienced developers. The image should avoid stereotypes and clichés and be respectful to the wide, diverse audience of developers. Make sure it is visually engaging, creative, and suitable for use as a featured image on a blog post about the latest JavaScript frameworks and libraries."
`;

const getArticleDescription = ({title}) => `
Create a short description for article with ${title}. Note that article about programming on Javascript. You must add an emoji after dot related to content of article.

Do not explain any. Do not write anything from yourself. Do not apologize.
Provide result as plain string.
`;

module.exports = {
	getArticleContentPrompt,
	getOpenAiImage,
	getArticleDescription
}