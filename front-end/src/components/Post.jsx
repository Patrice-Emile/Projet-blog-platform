import formattedDate from "../functions/formattedDate";

const Post = (props) => {
  const { id, title, content, author, created_at, updated_at, ...otherProps } =
    props;
  // console.log(id,  title, author, created_at, updated_at);
  return (
    <div {...otherProps} id-item={id}>
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

export default Post;
