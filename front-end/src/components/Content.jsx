import formattedDate from "../functions/formattedDate";

const Content = (props) => {
  const { id, title, content, author, created_at, updated_at, ...otherProps } =
    props;
  console.log(
    "\nid : ",
    id,
    "\ntitle : ",
    title,
    "\ncontent : ",
    content,
    "\nauthor : ",
    author,
    "\ncreated_at : ",
    created_at,
    "\nupdated_at : ",
    updated_at
  );
  return (
    <div {...otherProps} /*id-item-content={id}*/>
      <h3>{title}</h3>
      <h4>
        By <b>{author}</b>, on {formattedDate(new Date(created_at))}
        {updated_at ? (
          <>, mis à jour le {formattedDate(new Date(updated_at))}</>
        ) : null}
      </h4>
      <div>{content}</div>
    </div>
  );
};

export default Content;
