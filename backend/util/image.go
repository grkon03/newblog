package util

import (
	"crypto/rand"
	"errors"
	"io"
	"mime/multipart"
	"net/http"
	"os"
	"strconv"
	"time"
)

const imagepath = "/nwb/images/"

type ImageType = int

const (
	ImageTypeOther ImageType = iota
	ImageTypeThumbnail
	ImageTypeInArticle
)

func GetImageDirectPath(relativePath string) string {
	return imagepath + relativePath
}

func GetImageRelativeDirectory(it ImageType) string {
	switch it {
	case ImageTypeThumbnail:
		return "thumbnails/"
	case ImageTypeInArticle:
		return "inarticles/"
	default:
		return "others/"
	}
}

func NewImageRelativePath(it ImageType) string {
	filename := strconv.FormatInt(time.Now().Unix(), 10)
	filename += rand.Text()[:7]
	return GetImageRelativeDirectory(it) + filename
}

// detect the extension
func DetectImageExt(r io.ReadSeeker) (string, error) {
	buf := make([]byte, 512)
	_, err := io.ReadAtLeast(r, buf, 512)
	if err != nil {
		return "", err
	}

	_, err = r.Seek(0, io.SeekStart)
	if err != nil {
		return "", err
	}

	ty := http.DetectContentType(buf)
	switch ty {
	case "image/png":
		return "png", nil
	case "image/jpeg":
		return "jpg", nil
	case "image/gif":
		return "gif", nil
	default:
		return "", errors.New("the format " + ty + " is not supported as images")
	}
}

func StoreImage(image *multipart.FileHeader, it ImageType) (string, error) {
	src, err := image.Open()
	if err != nil {
		return "", errors.New("cannot read the image file")
	}
	defer src.Close()

	ext, err := DetectImageExt(src)
	if err != nil {
		return "", err
	}

	path := NewImageRelativePath(it) + "." + ext

	out, err := os.Create(GetImageDirectPath(path))
	if err != nil {
		return "", err
	}

	_, err = io.Copy(out, src)
	if err != nil {
		return "", err
	}

	return path, nil
}
