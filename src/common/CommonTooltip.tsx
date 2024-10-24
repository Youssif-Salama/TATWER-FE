import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/componentsShadcn/ui/tooltip";

const CommonTooltip = ({field}: any) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div>{field}</div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{field}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CommonTooltip;
