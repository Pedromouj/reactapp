import useHttpPrivate from "../../hooks/useHttpPrivate";
import AsyncSelect from "react-select/async";
import useToast from "../../hooks/useToast";

const AutoCompleteSelect = ({ url, paramKey = "texte", label, ...props }) => {
  const params = {
    ...props,
  };
  delete params.className;
  if (!url.includes("/")) {
    params.contexte = url;
    url = "/partypes";
  }
  const http = useHttpPrivate();
  const toast = useToast();

  const promiseOptions = async (inputValue) => {
    try {
      if (!url) return toast("error", "Missing URL attribute");
      if (inputValue.length < 3) return;
      const { data } = await http.put(url, { [paramKey]: inputValue, ...params });
      const opt = [];
      data.map((e) => {
        return opt.push({
          label: label ? e[label] : e.libelle,
          value: JSON.stringify(e),
        });
      });
      return opt;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <AsyncSelect
        classNames={props.className}
        {...props}
        defaultOptions
        loadOptions={promiseOptions}
      />
    </>
  );
};

export default AutoCompleteSelect;
