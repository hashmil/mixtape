import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export default async function handler(req, res) {
  if (!process.env.REPLICATE_API_TOKEN) {
    throw new Error(
      "The REPLICATE_API_TOKEN environment variable is not set. See README.md for instructions on how to set it."
    );
  }

  const prediction = await replicate.predictions.create({
    // Pinned to a specific version of Stable Diffusion
    // See https://replicate.com/stability-ai/sdxl
    // version: "8beff3369e81422112d93b89ca01426147de542cd4684c244b673b105188fe5f",
    version: "727e49a643e999d602a896c774a0658ffefea21465756a6ce24b7ea4165eba6a",

    // This is the text prompt that will be submitted by a form on the frontend
    // input: { prompt: req.body.prompt },
    input: {
      width: 1024,
      height: 1024,
      prompt:
        "pattern, flat vector design, three bright colours, bright blue, lime green, magenta, large geometric shapes",
      scheduler: "DPM++2MSDE",
      num_outputs: 1,
      guidance_scale: 7,
      negative_prompt:
        "nsfw, nude, naked, worst quality, low quality, white, black, dark colours, human, animal",
      num_inference_steps: 8,
    },
  });

  if (prediction?.error) {
    res.statusCode = 500;
    res.end(JSON.stringify({ detail: prediction.error }));
    return;
  }

  res.statusCode = 201;
  res.end(JSON.stringify(prediction));
}
