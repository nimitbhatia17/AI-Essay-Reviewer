import { Input } from "@/app/components/forms";
import { Spinner } from "@/app/components/common";

export default function Form({
  config,
  isLoading,
  buttonText,
  onChange,
  onSubmit,
}) {
  return (
    <form className="space-y-6" onSubmit={onSubmit}>
      {config.map((input) => (
        <Input
          key={input.labelId}
          labelId={input.labelId}
          type={input.type}
          onChange={onChange}
          value={input.value}
          required={input.required}
          link={input.link ? input.link : null}
        >
          {input.label}
        </Input>
      ))}
      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {isLoading ? <Spinner sm /> : `${buttonText}`}
        </button>
      </div>
    </form>
  );
}
