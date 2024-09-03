import admin from "firebase-admin";
import { Message } from "firebase-admin/messaging";
import { NextRequest, NextResponse } from "next/server";

if (!admin.apps.length) {
  console.log("here");
  const serviceAccount: any = {
    type: "service_account",
    project_id: "hospitality-d9246",
    private_key_id: "5cec393e5c6c4f90d45c7fb71d1d81ba322a5981",
    private_key:
      "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDJHAqej3finwBm\nqzD6IvCnq+VoGaT+PcwXYeDxQ47zRnvWm7aalN7pEsI55J54sfdLO633T8ghbsjm\nLpu2sIIZJ2PWh2POlhzqOre7R1LOgis33QUlkMDR9HMPo/XBuiMsCo5oD0FZ3K4Y\nwENqgudnPJf4Sl7kfvcycWr2kVJFGw5jKthvvbpzdSlRx6KU60UpOVMuS8Q7F5Ti\nIesyfcQ6I1ky9fnn+8RxeGwm8aDuA39n+7oSviVAWyslyMp0/TxjqU1wC8/1crr7\nNj/KS75UCZxj0t+hh0WtMW3Cp6gBr/InWpZD5Abe6aoGIRYK4I8QUU8wjvm52jh9\n0aTXFLZrAgMBAAECggEAG3sw+kzZkYavu9fd1/iJUSg8r3Z9pN5V8sYFwoI8WQMD\nLibWE5aPRWMyVk3m19Bd3hJ4KcjlrKfiXQ32akcBaCWJT4ntug+qQNmoPLe42Y5R\nEI+rwd/fcXFJfdQmY4QnhT+mCRM4l2qAAdLYA4iCzYkqrRugjvHInsR/3NSr3NRg\n3BLipcDJ2HG7qVMxAg0NTU+l0qKtw1AiLzOiO74tyU2l1KVhz+A90pZTriRgwUph\nnxE0KyF1Npe7rw+Qhq31fxIfKbXr/u3A00AGtqnSLlNP+IeldVX39B51ynzaPO5o\nVKwoc9++JN7Xmm8kJzjjWesaGEqOhoOyXYgh7CldfQKBgQD573Fn9+l5zh7bihTk\nMA6LMwTF18BOEQ1s1fqGgLF306NNLCGDobSa4yvxyhV6xYqcoMGEKKTO5lzqclbe\noqgn/I3G54DUVNDZ0P82RkDI4AHt010bsWIFF3iVDZRqj6fcDmfoHedUB1ONwC3N\nA/OttuDM0+vEjHViBPtoOx5lNwKBgQDN/Uz+KfLvwXaaTXSPZFw5JNDa+A3uFPJC\nQEVeDUZqhBpHGufF3UCU+MpyqOV/4lGci1+uCWHry+xg85ztDuChZruHHCD+xrOU\nyJlJnS7aSuUvRrvi+5T4t7oxT3ooHMGLHG+NvtgQvkJ/be9S2aTtgP1APvm2qzyJ\nBs7n4whSbQKBgEJfcAJoN7x9HHy4wquGh5Y3ykCv9wXESYhpmso1SuvDbE6GNbA7\nNTcctQLU47di1liZ6EoscPfw/SPVkXQ2Rem4i/4SZIf+rifp9Jx5M6Mkud5qjwNX\nq+wmO4N5w7w4wh8SRE3EAzaxa2LtcjxLnF65fiFm9emQU2vgXtNjP8MpAoGAScC8\n1W/dnLxvI7ZB2ql7X7Zv1Ublbe4wA0qRy6gDI1YjNnxKqgya9/vQOJeCfHRi9iLs\n4hpX5h5Ah0ISWMpv4TowQKLwqWgpmkbso2/U+7G/N1sjIJUldJwL3WXwffY10gIf\nauf+4pfMpWWOP+LPa344rs0diarr5L/8Swh9zU0CgYBvSxbeQ03vdNbXRytI40VH\nhJR5PyaXneGzgyZb+5hWY/21a3crXtwtca1jQPo/5AXPXwYFc1zSNOFcBmnfeyJl\nRe8WZSQ4HFUtH3HpDD4sXDi4tJA16Y2MwpsV2bQYISkcOI8no4D8oeilUjodPXkq\nNG+1CX7/U8bk+xzc/wxcyw==\n-----END PRIVATE KEY-----\n",
    client_email:
      "firebase-adminsdk-nbtjg@hospitality-d9246.iam.gserviceaccount.com",
    client_id: "114218374894258955880",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url:
      "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-nbtjg%40hospitality-d9246.iam.gserviceaccount.com",
    universe_domain: "googleapis.com",
  };

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export async function POST(request: NextRequest) {
  console.log("here");
  const { token, title, message, link } = await request.json();

  const payload: Message = {
    token,
    notification: {
      title: title,
      body: message,
    },
    webpush: link && {
      fcmOptions: {
        link,
      },
    },
  };

  try {
    console.log("here");
    await admin.messaging().send(payload);
    console.log("Notification sent successfully:", payload);
    return NextResponse.json({ success: true, message: "Notification sent!" });
  } catch (error) {
    console.error("Error sending notification:", error);
  }
}
