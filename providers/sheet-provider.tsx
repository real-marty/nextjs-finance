"use client";

import { NewAccountSheet } from "@/features/accounts/components/new-account-sheet";

import { useMountedState } from "react-use";

type Props = {};
export const SheetProvider = ({}: Props) => {
  if (!useMountedState()) return null;

  return (
    <>
      <NewAccountSheet />
    </>
  );
};
