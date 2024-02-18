import { useToast } from "@/components/ui/use-toast";

export function handleErrors(
  error: Error | any,
  toast: ReturnType<typeof useToast>["toast"]
) {
  if (!error) {
    toast({ title: "Error", description: "An error occurred" });
    return;
  }

  if (error.response) {
    toast({ title: "Error", description: error.response.data.error });
    return;
  }

  if (error.message) {
    toast({ title: "Error", description: error.message });
    return;
  }
}
