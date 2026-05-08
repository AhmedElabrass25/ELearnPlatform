import { FieldErrors, FieldValues, Path } from "react-hook-form";

type ErrorProps<T extends FieldValues> = {
  errors: FieldErrors<T>;
  name: Path<T>;
};

function Error<T extends FieldValues>({ errors, name }: ErrorProps<T>) {
  const error = errors[name];

  if (!error) return null;

  return (
    <p className="text-sm text-destructive">
      {error.message as string}
    </p>
  );
}

export default Error;