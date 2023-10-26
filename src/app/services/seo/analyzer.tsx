"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { useState } from "react"

type AnalysisResult = {
    titleKeywords: string[];
    descriptionKeywords: string[];
}

export default function Analyzer() {

    const [url, setUrl] = useState<string>('')
      
    function analyseTitle(doc: Document): string[] {
    const title = doc.querySelector("title")?.textContent;
    return title?.split(" ")?? [];
    }
    
    function analyseDescription(doc: Document): string[] {
    const description = doc.querySelector("meta[name='description']")?.getAttribute('content');
    return description?.split(" ")?? [];
    }
    
    function analyseHTMLStructure(doc: string): { numLines: number; numCharacters: number } {
    const codeHTML = doc.replace(/\s/g, "");
    const codeLines = codeHTML.split("\n");
    return {
        numLines: codeLines.length,
        numCharacters: codeHTML.length,
    };
    }
    
    async function analyseSEO(url: string): Promise<AnalysisResult> {
    let html = ''
    // Fetch the HTML
    try {
        const response = await fetch('/api/title', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url }),
        });
        const { data } = await response.json();
        html = data
    } catch (error) {
        console.error(error);
    };

    // Analyse the HTML structure
    const document = new DOMParser().parseFromString(html, 'text/html');

    // Analyse the title
    const titleKeywords = analyseTitle(document);
    console.log(titleKeywords)

    // Analyse the description
    const descriptionKeywords = analyseDescription(document);
    console.log(descriptionKeywords)
    
    // Return the analysis results
    return {
        titleKeywords,
        descriptionKeywords,
        };
    }
    const handleClick = (url: string) => {
        if (!url) {
            return;
        }
        const results = analyseSEO(url);
        console.log(results);
    }
    return (
        <div className="flex flex-row gap-1">
            <Input type="text" placeholder="https://example.com" onChange={(e) => setUrl(e.target.value)}/>
            <Button type="submit" onClick={()=>handleClick(url)}>Analyse!</Button>
        </div>
    )
}