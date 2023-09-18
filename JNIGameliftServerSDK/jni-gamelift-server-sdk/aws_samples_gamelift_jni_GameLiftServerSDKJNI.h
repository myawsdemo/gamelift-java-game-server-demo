/* DO NOT EDIT THIS FILE - it is machine generated */
#include <jni.h>
/* Header for class aws_samples_gamelift_jni_GameLiftServerSDKJNI */

#ifndef _Included_aws_samples_gamelift_jni_GameLiftServerSDKJNI
#define _Included_aws_samples_gamelift_jni_GameLiftServerSDKJNI
#ifdef __cplusplus
extern "C" {
#endif
	/*
	 * Class:     aws_samples_gamelift_jni_GameLiftServerSDKJNI
	 * Method:    getCurrentJavaVersion
	 * Signature: ()I
	 */
	JNIEXPORT jint JNICALL Java_aws_samples_gamelift_jni_GameLiftServerSDKJNI_getCurrentJavaVersion
	(JNIEnv*, jobject);

	/*
	 * Class:     aws_samples_gamelift_jni_GameLiftServerSDKJNI
	 * Method:    initGameLift
	 * Signature: (ILjava/util/List;Laws/samples/gamelift/jni/GameLiftServerSDKJNI/SdkInterface;)Z
	 */
	JNIEXPORT jboolean JNICALL Java_aws_samples_gamelift_jni_GameLiftServerSDKJNI_initGameLift
	(JNIEnv*, jobject, jint, jobject, jobject);

	/*
	 * Class:     aws_samples_gamelift_jni_GameLiftServerSDKJNI
	 * Method:    terminateGameSession
	 * Signature: ()V
	 */
	JNIEXPORT void JNICALL Java_aws_samples_gamelift_jni_GameLiftServerSDKJNI_terminateGameSession
	(JNIEnv*, jobject);

#ifdef __cplusplus
}
#endif
#endif