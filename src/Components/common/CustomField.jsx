import AutoCompleteSelect from "./AutoCompleteSelect";
import AtomInput from "./Input/AtomInput";
import Fileinput from "./Input/Fileinput";
import QuestionInput from "./Input/QuestionInput";
import TextField from "./Input/TextInput";

export const CustomField = (props) => {
  const { atomeData, name, ...rest } = props;

  switch (atomeData.datatype) {
    case "file":
      return (
        <Fileinput
          atomeData={atomeData}
          name={name}
          placeholder={atomeData.libelle}
          required={atomeData.obligatoire}
          {...rest}
        />
      );

    case "select":
      return (
        <AutoCompleteSelect
          atomeData={atomeData}
          name={name}
          url={atomeData.masque}
          defaultValue={atomeData.datavaleur}
          placeholder={atomeData.libelle}
          required={atomeData.obligatoire}
        />
      );

    case "Question":
      return (
        <QuestionInput
          defaultValue={atomeData.datavaleur}
          required={atomeData.obligatoire}
          name={name}
          atomeData={atomeData}
        />
      );

    case "atome":
      return (
        <AtomInput
          defaultValue={{ label: atomeData.datavaleur, value: atomeData.iddatavaleur }}
          required={atomeData.obligatoire}
          name={name}
          atomeData={atomeData}
        />
      );

    default:
      return atomeData.datavaleur?.length < 60 ? (
        <TextField
          {...rest}
          type={atomeData.datatype}
          name={name}
          defaultValue={atomeData.datavaleur}
          placeholder={atomeData.libelle}
          required={atomeData.obligatoire}
          // pattern={atomeData.masque.length ? atomeData.masque : null}
        />
      ) : (
        <textarea
          cols="30"
          rows="4"
          {...rest}
          type={atomeData.datatype}
          name={name}
          defaultValue={atomeData.datavaleur}
          placeholder={atomeData.libelle}
          required={atomeData.obligatoire}
        ></textarea>
      );
  }
};
