import { StyleSheet, Text, View, Button } from 'react-native';
import React, { useState } from 'react';
import RNFS from 'react-native-fs';

const VideoDownloader = () => {

    const [savedFilePath, setSavedFilePath] = useState(null);

    const videoUrl = {
        url: 'https://hillypix-media-bucket.s3.ap-south-1.amazonaws.com/movie-trailer/wangangdaba.mp4',
    };

    const folderName = 'MyVideos';
    const fileName = 'SomaSong1.mp4';

    // read function

    const downloadFolderName = 'MyDownloadedFiles';

    const downloadVideo = async (url, folderName, fileName, onProgress) => {
        try {
            // Get the app's document directory path
            const appDirectory = RNFS.DocumentDirectoryPath;

            // Create the folder if it doesn't exist
            const folderPath = `${appDirectory}/${folderName}`;
            await RNFS.mkdir(folderPath);

            // Download and save the video
            const videoPath = `${folderPath}/${fileName}`;
            const options = {
                fromUrl: 'https://hdvideo9.com/files/download/type/mp4/id/9680',
                toFile: videoPath,
                background: true,
                discretionary: true,
                progressDivider: 1, // Use 1 for percentage progress (0-1)
                begin: (res) => {
                    console.log('Download has begun:', res);
                },
                progress: (res) => {
                    const percentage = (res.bytesWritten / res.contentLength) * 100;
                    onProgress(percentage.toFixed(2));
                },
            };
            const downloadResult = await RNFS.downloadFile(options);
            const { jobId, promise } = downloadResult;

            // Attach a callback to handle the completion of the download
            promise.then((response) => {
                if (response.statusCode === 200) {
                    console.log('Video saved successfully:', videoPath);
                    setSavedFilePath(videoPath)
                    // Do additional processing if needed
                } else {
                    console.error('Failed to download video. Status code:', response.statusCode);
                }
            });

            return videoPath;

        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    };

    const downloadkaro = () => {
        downloadVideo(videoUrl.url,folderName, fileName, (progress) => {
            console.log(`Download progress: ${progress}%`);
        })
            .then((downloadedFilePath) => {
                console.log('File downloaded successfully:', downloadedFilePath);
            })
            .catch((error) => {
                console.error('Failed to download file:', error);
            });
    }



    const getAllItemsList = () => {
        const directoryPath = `${RNFS.DocumentDirectoryPath}/MyVideos`;

        console.log('Directory path:', directoryPath);

        RNFS.readDir(directoryPath)
            .then((result) => {
                console.log('List of files and directories:', result);

                if (result.length > 0) {
                    const firstItem = result[0];

                    // Log information about the first item
                    console.log('Name:', firstItem.name);
                    console.log('Is File:', firstItem.isFile());
                    console.log('Is Directory:', firstItem.isDirectory());

                    if (firstItem.isFile()) {
                        // If it's a file, read its contents as binary
                        return RNFS.readFile(firstItem.path, 'base64');
                    } else {
                        return 'No file to read.';
                    }
                } else {
                    return 'Directory is empty.';
                }
            })
            .then((contents) => {
                // Log the file contents if available
                if (contents !== undefined) {
                    // console.log('File contents:', contents);
                }
            })
            .catch((err) => {
                console.error('Error:', err.message, err.code);
            });
    };

    // Usage
    getAllItemsList();




    return (
        <View style={styles.pageContainer}>
            <Button
                onPress={() => {
                    downloadkaro(videoUrl.url, folderName, fileName);
                }}
                title="Dowload Video"
            />
            <Button
                onPress={() => {
                    getAllItemsList();
                }}
                title="Get List of Downloaded Items."
            />
        </View>
    );
};

export default VideoDownloader;

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
