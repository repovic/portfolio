import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";

import {
    Comments,
    Title,
    Comment,
    CommentData,
    UserAvatar,
    CommentDetails,
    Username,
    PostedAt,
    CommentContent,
    CommentActions,
    CommentAction,
    PostCommentContainer,
    PostCommentDetails,
    PostCommentInput,
} from "./CommentsElements";

import { LikeIcon, DislikeIcon, TrashIcon } from "../../../svg";

import { ConfirmBoxContext } from "../../../context/";

const CommentsComponent = ({
    user,
    comments,
    commentsEnabled,
    likeComment,
    dislikeComment,
    postComment,
    deleteComment,
    ...rest
}) => {
    const [newCommentContent, setNewCommentContent] = useState("");

    const { showConfirmBox } = useContext(ConfirmBoxContext);

    const [attributes, setAttributes] = useState([{ "data-aos": "fade-up" }]);

    const router = useRouter();

    if (!commentsEnabled && comments.length == 0) {
        return <></>;
    }

    useEffect(() => {
        if (window !== undefined) {
            if (!(window.innerWidth < 1500)) {
                setAttributes([{ "data-aos": "fade-up" }]);
            } else {
                setAttributes([]);
            }
        }
    }, []);

    return (
        <Comments id="comments" {...rest}>
            <Title>Comments ({comments?.length})</Title>
            <div>
                {commentsEnabled && (
                    <PostCommentContainer>
                        <UserAvatar
                            src={
                                user.data?.avatarUrl
                                    ? user.data?.avatarUrl
                                    : "https://eu.ui-avatars.com/api/?background=000DFF&color=000000&bold=true&name=Awesome+Person"
                            }
                            alt={
                                user.data?.displayName
                                    ? user.data?.displayName
                                    : "Awesome Person" + " - Avatar"
                            }
                        />
                        <CommentData>
                            <PostCommentDetails>
                                <div>
                                    <Username>
                                        {user.data.displayName &&
                                        user.data.username
                                            ? `${user.data.displayName} (@${user.data.username})`
                                            : "Awesome Person"}
                                    </Username>
                                </div>
                                <PostCommentInput
                                    placeholder={"Add a comment..."}
                                    value={newCommentContent}
                                    onChange={(e) => {
                                        setNewCommentContent(e.target.value);
                                    }}
                                    autoComplete="off"
                                    autoCorrect="off"
                                    disabled={user.authToken ? false : true}
                                />
                            </PostCommentDetails>
                            <CommentActions>
                                {user.authToken ? (
                                    <>
                                        <CommentAction
                                            className="bg-none"
                                            onClick={() => {
                                                setNewCommentContent("");
                                            }}
                                        >
                                            Cancel
                                        </CommentAction>
                                        <CommentAction
                                            className={
                                                newCommentContent.length > 0
                                                    ? "bg-blue"
                                                    : null
                                            }
                                            disabled={
                                                newCommentContent.length > 0
                                                    ? false
                                                    : true
                                            }
                                            onClick={
                                                newCommentContent.length > 0
                                                    ? () => {
                                                          showConfirmBox(
                                                              `Are you sure you want to post comment?`,
                                                              () => {
                                                                  postComment(
                                                                      newCommentContent
                                                                  );
                                                                  setNewCommentContent(
                                                                      ""
                                                                  );
                                                              }
                                                          );
                                                      }
                                                    : null
                                            }
                                        >
                                            Comment
                                        </CommentAction>
                                    </>
                                ) : (
                                    <CommentAction
                                        className="bg-blue"
                                        onClick={() => {
                                            router.push({
                                                pathname: `/signin`,
                                            });
                                        }}
                                    >
                                        Sign In
                                    </CommentAction>
                                )}
                            </CommentActions>
                        </CommentData>
                    </PostCommentContainer>
                )}

                {comments?.map((comment) => (
                    <Comment {...attributes[0]} key={comment?._id}>
                        <UserAvatar
                            src={comment?.author?.avatarUrl}
                            alt={comment?.author?.displayName + " - Avatar"}
                        />
                        <CommentData>
                            <CommentDetails>
                                <div>
                                    <Username>
                                        {comment?.author?.displayName} (@
                                        {comment?.author?.username})
                                    </Username>
                                    <PostedAt>
                                        {new Date(
                                            comment?.createdAt
                                        ).toLocaleDateString("sr-RS")}
                                    </PostedAt>
                                </div>
                                <CommentContent>
                                    {comment?.content}
                                </CommentContent>
                            </CommentDetails>
                            <CommentActions>
                                <CommentAction
                                    className="mr"
                                    onClick={() => {
                                        likeComment(comment?._id);
                                    }}
                                >
                                    <LikeIcon />{" "}
                                    {comment?.likes ? comment?.likes.length : 0}
                                </CommentAction>
                                <CommentAction
                                    className="mr"
                                    onClick={() => {
                                        dislikeComment(comment?._id);
                                    }}
                                >
                                    <DislikeIcon />{" "}
                                    {comment?.dislikes
                                        ? comment?.dislikes.length
                                        : 0}
                                </CommentAction>
                                {user.data?.role == "Administrator" && (
                                    <CommentAction>
                                        <TrashIcon
                                            onClick={() =>
                                                showConfirmBox(
                                                    `Are you sure you want to delete comment?`,
                                                    () => {
                                                        deleteComment(
                                                            comment._id
                                                        );
                                                    }
                                                )
                                            }
                                        />
                                    </CommentAction>
                                )}
                            </CommentActions>
                        </CommentData>
                    </Comment>
                ))}
            </div>
        </Comments>
    );
};

export default CommentsComponent;
