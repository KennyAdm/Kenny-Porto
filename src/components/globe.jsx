import IconCloud from "./ui/icon-cloud";
import {
  siTypescript, siJavascript, siDart, siOpenjdk, siReact, siFlutter,
  siAndroid, siHtml5, siCss, siNodedotjs, siExpress, siNextdotjs,
  siPrisma, siPostgresql, siFirebase, siNginx, siVercel,
  siTestinglibrary, siJest, siCypress, siDocker, siGit,
  siJira, siGithub, siGitlab, siAndroidstudio, siFigma,
} from "simple-icons";

const icons = [
  siTypescript, siJavascript, siDart, siOpenjdk, siReact, siFlutter,
  siAndroid, siHtml5, siCss, siNodedotjs, siExpress, siNextdotjs,
  siPrisma, siPostgresql, siFirebase, siNginx, siVercel,
  siTestinglibrary, siJest, siCypress, siDocker, siGit,
  siJira, siGithub, siGitlab, siAndroidstudio, siFigma,
];

function IconCloudDemo() {
  return (
    <div className="relative flex size-full max-w-lg items-center justify-center overflow-hidden rounded-lg px-20 pb-20 pt-8 bg-transparent">
      <IconCloud icons={icons} />
    </div>
  );
}

export default IconCloudDemo;
