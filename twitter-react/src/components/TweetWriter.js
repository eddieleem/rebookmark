import React, {useRef, useState} from "react";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import {
    Image as MediaIcon,
    Gif as GifIcon,
    Poll as PollIcon,
    EmojiEmotionsOutlined as EmojiIcon,
    Schedule as ScheduleIcon

} from "@material-ui/icons";
import {TweetWriterStyle} from "./TweetWriterStyle";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import SpecialTextField from "./SpecialTextField";
import {createTweet} from "../redux/actions";
import {connect} from "react-redux";
import LinearProgress from "@material-ui/core/LinearProgress";
import {getUserProfileImg, isStateLoading} from "../redux/stateUtils";

function TweetWriter({userState, createState, createTweet, parent, setDialogClose, fallback, shit}) {
    const style = TweetWriterStyle();
    const tweetText = useRef(null);
    const [media, setMedia] = useState(null);
    const [mediaPrev, setMediaPrev] = useState("");
    // todo : clear output after sending tweet

    const onMediaChange = ev => {
        const file = ev.target.files[0];
        setMedia(file);

        let reader = new FileReader();
        reader.onload = ev1 => setMediaPrev(ev1.target.result);
        reader.readAsDataURL(file);
    };


    const onSend = ev => {
        const tweet = {
            text: tweetText.current.value,
            media: media,
            parent: parent
        };

        // tweetText.current.value = "";
        createTweet(tweet, fallback, shit);
        if (setDialogClose != null) setDialogClose();

        setMediaPrev("");
    };

    return (
        <>
            <Grid container className={style.root}>
                <Grid item xs={2} md={1}><Avatar src={getUserProfileImg(userState.profile_picture)} alt={userState.username}/></Grid>
                <Grid container xs={10} md={11}>
                    <Grid item xs={12}><SpecialTextField textRef={tweetText}/></Grid>
                    {mediaPrev != "" ? <Grid item xs={12}><img width={200} height={200} src={mediaPrev} /> </Grid>: null}
                    <Grid container alignItems={"center"} justify={"space-between"} className={style.actionsLayout}>
                        <Grid container xs>
                            <Grid item><IconButton component={"label"}><MediaIcon/><input onChange={onMediaChange}
                                                                                          id={"media"} type={"file"}
                                                                                          accept={"image/*"}
                                                                                          hidden/></IconButton></Grid>
                            <Grid item><IconButton><GifIcon/></IconButton></Grid>
                            <Grid item><IconButton><PollIcon/></IconButton></Grid>
                            <Grid item><IconButton><EmojiIcon/></IconButton></Grid>
                            <Grid item><IconButton><ScheduleIcon/></IconButton></Grid>
                        </Grid>
                        <Grid item xs={3} sm={3} md={2} lg={2}>
                            <Button variant={"contained"} onClick={onSend} disableElevation color={"secondary"}
                                    className={style.sendButton}>Tweet</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            {isStateLoading(createState) ? <LinearProgress/> : null}
            <Divider/>
        </>
    );
}

const mapStateToProp = state => ({
    createState: state.createTweet,
    userState: state.user
});

const mapActionsToProp = dispatch => ({
    createTweet: (tweet, fallback, shit) => dispatch(createTweet(tweet, fallback, shit)),
});

export default connect(mapStateToProp, mapActionsToProp)(TweetWriter);