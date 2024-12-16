import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import ReactMarkdown from "react-markdown"

type ResponseProps = {
    content: string;
}

export default function Response({ content }: ResponseProps) {
    const codeRegex = /```([\s\S]*?)```/g;
    const codeMatches = [...content.matchAll(codeRegex)];
    const codeText = codeMatches.map(m => m[1].trim());

    const textParts = content.split(/```[\s\S]*?```/);

    if (codeText.length > 0) {
        const firstCode = codeText[0];
        const firstLineBreak = firstCode.indexOf('\n');
        const language = firstLineBreak !== -1 ? firstCode.slice(0, firstLineBreak) : undefined;
        const codeOnly = firstLineBreak !== -1 ? firstCode.slice(firstLineBreak + 1) : firstCode;

        return (
            <>
                {textParts[0] && <ReactMarkdown>{textParts[0]}</ReactMarkdown>}

                <br />

                <SyntaxHighlighter language={language} style={dracula}>
                    {codeOnly}
                </SyntaxHighlighter>


                <br />

                {textParts[1] && <ReactMarkdown>{textParts[1]}</ReactMarkdown>}
            </>
        );
    } else {
        return <>{content}</>;
    }
}
