import cv2
import numpy as np
import argparse
import os

def edge_detection(img, line_width, blur):
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    grayblur = cv2.medianBlur(gray, blur)
    edges = cv2.adaptiveThreshold(
        grayblur,
        255,
        cv2.ADAPTIVE_THRESH_MEAN_C,
        cv2.THRESH_BINARY,
        line_width,
        blur
    )
    return edges

def color_quantization(img, k):
    data = np.float32(img).reshape((-1, 3))
    criteria = (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 20, 0.001)
    _, label, center = cv2.kmeans(data, k, None, criteria, 10, cv2.KMEANS_RANDOM_CENTERS)
    center = np.uint8(center)
    result = center[label.flatten()]
    return result.reshape(img.shape)

def cartoonify(input_path, output_path, line_width, blur, colors):
    img = cv2.imread(input_path)

    if img is None:
        raise ValueError(f"Could not read image at {input_path}")

    edges = edge_detection(img, line_width, blur)
    quantized = color_quantization(img, colors)
    blurred = cv2.bilateralFilter(quantized, 7, 200, 200)
    cartoon = cv2.bitwise_and(blurred, blurred, mask=edges)
    cv2.imwrite(output_path, cartoon)

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", required=True)
    parser.add_argument("--output", required=True)
    parser.add_argument("--lineWidth", type=int, default=13)
    parser.add_argument("--blur", type=int, default=5)
    parser.add_argument("--colors", type=int, default=8)

    args = parser.parse_args()
    cartoonify(
        args.input,
        args.output,
        args.lineWidth,
        args.blur,
        args.colors
    )
