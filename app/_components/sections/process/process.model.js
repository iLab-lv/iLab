export function normalizeProcessSteps(steps = []) {
  return steps.filter(Boolean).map(step => Array.isArray(step)
    ? { title: step[0], text: step[1] }
    : { title: step.title, text: step.text ?? step.description }
  ).filter(step => step.title);
}
