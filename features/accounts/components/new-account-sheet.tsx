import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

type Props = {};
export const NewAccountSheet = ({}: Props) => {
  return (
    <Sheet open={true}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>New Account</SheetTitle>
          <SheetDescription>
            Create a new account to manage your finances.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
