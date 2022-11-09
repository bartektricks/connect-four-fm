import type { FunctionComponent, SVGProps } from "react";

type UnionKeys<T> = T extends T ? keyof T : never;
type StrictUnionHelper<T, TAll> = T extends T
  ? T & Partial<Record<Exclude<UnionKeys<TAll>, keyof T>, undefined>>
  : never;

export type StrictUnion<T> = StrictUnionHelper<T, T>;

export type SVG = FunctionComponent<
  SVGProps<SVGSVGElement> & { title?: string | undefined }
>;
