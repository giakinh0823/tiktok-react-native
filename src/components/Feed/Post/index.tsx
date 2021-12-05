import { Video } from "expo-av";
import React, { useEffect, useImperativeHandle, useRef } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";

interface Props {
    post: any;
}

export const PostSingle = React.forwardRef(({ post }: Props, parentRef: any) => {
    const ref = useRef<any>(null);

    useImperativeHandle(parentRef, () => ({
        play,
        unload,
        stop
    }))

 
    useEffect(() => {
        return () => {
            unload();
        }
    },[])

    const play = async () => {
        if (ref.current == null) {
            return;
        }
        const status = await ref.current.getStatusAsync();
        if (status?.isPlaying) {
            return;
        }
        console.log("play");
        try {
            await ref.current.playAsync();
        } catch (e) {
            console.log(e)
        }
    }


    const stop = async () => {
        if (ref.current == null) {
            return;
        }
        const status = await ref.current.getStatusAsync();
        if (!status?.isPlaying) {
            return;
        }
        console.log("stop");
        try {
            await ref.current.pauseAsync();
        } catch (e) {
            console.log(e)
        }
    }

    const unload = async () => {
        if (ref.current == null) {
            return;
        }
        console.log("unload");
        try {
            await ref.current.unloadAsync();
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <Video
                ref={ref}
                style={styles.video}
                resizeMode={Video.RESIZE_MODE_CONTAIN}
                shouldPlay={false}
                isLooping
                usePoster
                posterSource={{ uri: post?.media[1] }}
                posterStyle={{ resizeMode: 'cover', height: '100%' }}
                source={{ uri: post?.media[0] }} />
        </>
    )
})




export default PostSingle;

const styles = StyleSheet.create({
  video: {
    flex: 1,
    width: "100%",
    backgroundColor: 'black',
  },
});
