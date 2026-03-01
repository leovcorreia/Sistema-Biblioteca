export default function FormInput(props: any) {
  const { 
    validation, 
    invalid = "false", 
    dirty = "false", 
    onTurnDirty, 
    onBlur, // <-- adiciona suporte ao onBlur customizado
    ...inputProps 
  } = props;

  function handleBlur(event: React.FocusEvent<HTMLInputElement>) {
    if (onTurnDirty) onTurnDirty(props.name); // só chama se existir
    if (onBlur) onBlur(event); // também chama o onBlur que veio de fora 
  }

  return (
    <input 
      {...inputProps}
      onBlur={handleBlur}
      data-invalid={invalid}
      data-dirty={dirty}
    />
  );
}
