import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";


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
                {textParts[0] && <p>{textParts[0]}</p>}

                <SyntaxHighlighter language={language} style={atomDark}>
                    {codeOnly}
                </SyntaxHighlighter>

                {textParts[1] && <p>{textParts[1]}</p>}
            </>
        );
    } else {
        return <>{content}</>;
    }
}
