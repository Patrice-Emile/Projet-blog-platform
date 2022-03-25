import formattedDate from "../functions/formattedDate";

const Comment = (props) => {
  const { id, content, author, created_at, updated_at, ...otherProps } = props;
  // console.log(
  //   "id : ",
  //   id,
  //   "content : ",
  //   content,
  //   "author : ",
  //   author,
  //   "created_at : ",
  //   created_at,
  //   "updated_at : ",
  //   updated_at
  // );
  return (
    <>
      <div {...otherProps} id-item-comment={id}>
        <h4>
          By <b>{author}</b>, on {formattedDate(new Date(created_at))}
          {updated_at ? (
            <>, mis à jour le {formattedDate(new Date(updated_at))}</>
          ) : null}
        </h4>
        <div>{content}</div>
      </div>
    </>
  );
};

export default Comment;
