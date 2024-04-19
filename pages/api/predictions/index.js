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
    version: "8beff3369e81422112d93b89ca01426147de542cd4684c244b673b105188fe5f", // SDXL
    // version: "727e49a643e999d602a896c774a0658ffefea21465756a6ce24b7ea4165eba6a", // ByteDance model

    // This is the text prompt that will be submitted by a form on the frontend
    // input: { prompt: req.body.prompt },
    input: {
      width: 768,
      height: 768,
      prompt:
        "pattern, abstract art, de stijl, flat vector design, flat colours, three vibrant and bright colours, bright blue, lime green, magenta, purple, large geometric shapes, random shapes, solid colours, digital art, tiny dot texture, noise texture",
      refine: "expert_ensemble_refiner",
      scheduler: "DDIM",
      lora_scale: 0.6,
      num_outputs: 1,
      guidance_scale: 20,
      apply_watermark: false,
      high_noise_frac: 0.8,
      negative_prompt:
        "shadows, 3d, depth, yellow, white, black, lines, gradients",
      prompt_strength: 1,
      num_inference_steps: 20,
      disable_safety_checker: true,
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
