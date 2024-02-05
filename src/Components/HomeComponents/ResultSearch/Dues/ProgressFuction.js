export default function ProgressFuction(setGloubalCount, Category, GlobalCount) {
  setGloubalCount((prev) => prev + 10);
  const progressElement = document.getElementById(Category);
  const progressWith = document.getElementById("width-" + Category);

  const Porcentages = (GlobalCount * 100) / progressWith?.getAttribute("data-tooltip-content");
  if (progressElement) {
    progressElement.textContent = "";
    progressElement.textContent = `${
      Math.floor(Porcentages) > 100 ? 100 : Math.floor(Porcentages)
    }%`;
  }

  if (progressWith) {
    progressWith.style.width = `${Porcentages}%`;
  }
}
