"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type AnalysisResult = {
    titleKeywords: string;
    descriptionKeywords: string;
}

export default function Analyzer() {
      
    function analyseTitle(html: Document): string[] {
    const title = html.querySelector("title")?.textContent;
    return title?.split(" ")?? [];
    }
    
    function analyseDescription(html: Document): string[] {
    const description = html.querySelector("meta[name='description']")?.textContent;
    return description?.split(" ")?? [];
    }
    
    function analyseHTMLStructure(html: string): { numLines: number; numCharacters: number } {
    const codeHTML = html.replace(/\s/g, "");
    const codeLines = codeHTML.split("\n");
    return {
        numLines: codeLines.length,
        numCharacters: codeHTML.length,
    };
    }
    
    async function analyseSEO(url: string): Promise<AnalysisResult> {
        console.log(url)
    try {
        const response = await fetch('/api/title', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url }),
        });
        const { message } = await response.json();
        console.log(message)
        } catch (error) {
        console.error(error);
        };
    
    // Analyse the title
    const titleKeywords = "titleKeywords";

    // Analyse the description
    const descriptionKeywords = "descriptionKeywords";
    
    // Return the analysis results
    return {
        titleKeywords,
        descriptionKeywords,
    };
    }
    const handleClick = () => {
        const results = analyseSEO("https://www.google.com/");
        console.log(results);
    }
    return (
        <div className="flex flex-row">
            <Input type="text" placeholder="https://example.com" />
            <Button type="submit" onClick={handleClick}>Analyse!</Button>
        </div>
    )
}