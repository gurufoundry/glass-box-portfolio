const fs = require('fs');
const path = require('path');

async function generate() {
  // Dynamic import for the local AI library
  const { pipeline } = await import('@xenova/transformers');

  // 1. Load the model (Downloads ~20MB automatically)
  console.log("📥 Loading local AI model (Xenova/all-MiniLM-L6-v2)...");
  const extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');

  // 2. Find your projects file
  // Tries src/data first, then falls back to root/data
  let projectsPath = path.join(process.cwd(), 'src', 'data', 'projects.json');
  if (!fs.existsSync(projectsPath)) {
    projectsPath = path.join(process.cwd(), 'data', 'projects.json');
  }
  
  const rawData = fs.readFileSync(projectsPath, 'utf8');
  const projects = JSON.parse(rawData);

  const embeddedProjects = [];
  console.log("🧠 Vectorizing projects locally...");

  // 3. Convert text to numbers
  for (const project of projects) {
    const textToEmbed = `${project.title} ${project.description} ${project.tech.join(' ')}`;
    
    // The magic line: No API key, just local math
    const output = await extractor(textToEmbed, { pooling: 'mean', normalize: true });
    const vector = Array.from(output.data);

    embeddedProjects.push({ ...project, embedding: vector });
    console.log(`✅ Processed: ${project.title}`);
  }

  // 4. Save the output
  let outputPath = path.join(process.cwd(), 'src', 'data', 'embeddings.json');
  if (!fs.existsSync(path.join(process.cwd(), 'src', 'data'))) {
     outputPath = path.join(process.cwd(), 'data', 'embeddings.json');
  }
  
  fs.writeFileSync(outputPath, JSON.stringify(embeddedProjects, null, 2));
  console.log("🎉 Done! Real embeddings generated (Offline Mode).");
}

generate();