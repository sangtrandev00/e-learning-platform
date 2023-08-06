type Props = {
  className: string;
};
const Notes = (props: Props) => {
  return <div className={props.className + ' notes'}>Notes</div>;
};

export default Notes;
