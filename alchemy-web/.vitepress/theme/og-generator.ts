import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

/**
 * Calculates dynamic font size and line height.
 * @param textLines Array of text lines.
 * @param baseSize Base font size for a moderate number of lines.
 * @param minSize Minimum font size for many lines.
 * @param maxSize Maximum font size for few lines.
 * @param linesForBase Number of lines to use baseSize.
 * @param linesForMax Number of lines to trigger maxSize (e.g., 1 or 2).
 * @param lineHeightFactor Factor to calculate line height from font size.
 * @returns Object with new fontSize and lineHeight.
 */
function calculateDynamicFontSizeAndLineHeight(
  textLines: string[],
  baseSize: number,
  minSize: number,
  maxSize: number,
  linesForBase: number,
  linesForMax: number,
  lineHeightFactor: number
): { fontSize: number; lineHeight: number } {
  const numLines = textLines.length;
  let fontSize = baseSize;

  if (numLines <= 0) {
    fontSize = baseSize; // Default for empty or no lines
  } else if (numLines <= linesForMax) {
    fontSize = maxSize; // Max size for very few lines
  } else if (numLines <= linesForBase) {
    fontSize = baseSize; // Base size for moderate lines
  } else {
    // For lines exceeding linesForBase, decrease font size towards minSize
    const extraLines = numLines - linesForBase;
    // Calculate reduction per extra line to span the range from baseSize to minSize
    // Aim to reach minSize after about 2-3 extra lines beyond linesForBase
    const reductionRange = baseSize - minSize;
    const linesForReductionSpan = 3; // Number of lines over which to make the full reduction
    const reductionPerExtraLine = reductionRange / linesForReductionSpan;
    fontSize = Math.max(minSize, baseSize - extraLines * reductionPerExtraLine);
  }
  return { fontSize, lineHeight: Math.round(fontSize * lineHeightFactor) };
}

/**
 * Generate an Open Graph image with a title, description, and alchemist image
 *
 * @param title Page title to display on the left
 * @param description Optional page description to display below the title
 * @param outputPath Path to save the generated image
 * @returns Promise that resolves when the image is generated
 */
export async function generateOgImage(
  title: string,
  description: string | undefined,
  outputPath: string
): Promise<void> {
  try {
    if (path.basename(outputPath) === "docs-home.png") {
      const alchemyOgPath = path.resolve("public/alchemy-og.png");
      try {
        await fs.access(alchemyOgPath);
        const imageBuffer = await fs.readFile(alchemyOgPath);
        await fs.writeFile(outputPath, imageBuffer);
        console.log(`Used existing image for docs-home: ${outputPath}`);
        return;
      } catch (error) {
        console.warn(
          `alchemy-og.png not found, generating image for docs-home instead`
        );
      }
    }

    const backgroundColor = "#0A0A0A"; // Even darker background
    const flattenBackgroundColor = { r: 10, g: 10, b: 10 };
    const logoFileName = "potion.png";
    const logoSize = 100;
    const descriptionFillColor = "#B0B0B0"; // Silver-ish color for description

    const totalWidth = 1200;
    const totalHeight = 630;
    const textAreaWidth = Math.floor(totalWidth * 0.6);
    const imageAreaWidth = totalWidth - textAreaWidth;
    const leftMargin = 80;
    const topMargin = 130; // Adjusted base top margin for text block centering with new logo pos

    const firstHorizontalLineY = Math.round(totalHeight * 0.15);
    const horizontalLine2Y = Math.round(totalHeight * 0.85);
    const verticalLine1X = Math.round(totalWidth * 0.8);
    const verticalLine2X = Math.round(totalWidth * 0.4);

    const logoCenterY = firstHorizontalLineY / 2;
    const logoY = logoCenterY - logoSize / 2;

    const titleLines = wrapText(title, 23); // Adjusted for more aggressive dynamic font
    let descriptionLines: string[] = [];
    if (description) {
      descriptionLines = wrapText(description, 45); // Adjusted
    }

    // More aggressive dynamic font sizing for Title
    const titleFontConfig = calculateDynamicFontSizeAndLineHeight(
      titleLines,
      50, // baseSize (for 2 lines)
      36, // minSize (for 4+ lines)
      60, // maxSize (for 1 line)
      2, // linesForBase
      1, // linesForMax
      1.2 // lineHeightFactor
    );
    const titleFontSize = titleFontConfig.fontSize;
    const titleLineHeight = titleFontConfig.lineHeight;

    let descriptionFontSize = 0;
    let descriptionLineHeight = 0;
    const spaceBetweenTitleAndDesc = descriptionLines.length > 0 ? 30 : 0;

    if (descriptionLines.length > 0) {
      // More aggressive dynamic font sizing for Description
      const descFontConfig = calculateDynamicFontSizeAndLineHeight(
        descriptionLines,
        20, // Lowered baseSize for description (was 22)
        12, // Reduced minSize for description (was 14)
        24, // Adjusted maxSize for description (was 26)
        5, // Increased linesForBase (was 4) to be even more forgiving
        2, // linesForMax (unchanged)
        1.1 // Further reduced lineHeightFactor (was 1.2) to pack more content
      );
      descriptionFontSize = descFontConfig.fontSize;
      descriptionLineHeight = descFontConfig.lineHeight;
    }

    const titleHeight = titleLines.length * titleLineHeight;
    const maxDescriptionHeight = totalHeight * 0.65; // Increased from 0.55 to 0.65 - allow up to 65% of total height for description
    const descriptionHeight = Math.min(
      maxDescriptionHeight,
      descriptionLines.length * descriptionLineHeight
    );
    const totalTextHeight =
      titleHeight + spaceBetweenTitleAndDesc + descriptionHeight;

    // Give more space to text block when description is long
    let adjustedTopMargin = topMargin;
    if (descriptionLines.length > 4) {
      adjustedTopMargin = Math.max(topMargin * 0.7, 90); // Reduce top margin to give more space for text
    }

    const textBlockTop = Math.max(
      adjustedTopMargin, // Use adjusted margin when description is long
      (totalHeight - totalTextHeight) / 2
    );

    const lineStrokeColor = "#222222"; // Darker grid lines for the darkest bg

    let gridLines = "";
    gridLines += `
      <path d="M0 ${firstHorizontalLineY} L${verticalLine1X} ${firstHorizontalLineY}" stroke="${lineStrokeColor}" stroke-width="1.5" />
      <path d="M0 ${horizontalLine2Y} L${totalWidth} ${horizontalLine2Y}" stroke="${lineStrokeColor}" stroke-width="1.5" />
      <path d="M${verticalLine1X} 0 L${verticalLine1X} ${totalHeight}" stroke="${lineStrokeColor}" stroke-width="1.5" />
      <path d="M${verticalLine2X} ${horizontalLine2Y} L${verticalLine2X} ${totalHeight}" stroke="${lineStrokeColor}" stroke-width="1.5" />
    `;

    let titleSvg = "";
    titleLines.forEach((line, index) => {
      const y = textBlockTop + index * titleLineHeight + titleFontSize * 0.8;
      titleSvg += `<text x="${leftMargin}" y="${y}" font-size="${titleFontSize}" font-weight="bold" fill="#ffffff" font-family="sans-serif" dominant-baseline="hanging">${escapeXml(line)}</text>\n`;
    });

    let descriptionSvg = "";
    if (descriptionLines.length > 0) {
      descriptionLines.forEach((line, index) => {
        const y =
          textBlockTop +
          titleHeight +
          spaceBetweenTitleAndDesc +
          index * descriptionLineHeight +
          descriptionFontSize * 0.8;
        descriptionSvg += `<text x="${leftMargin}" y="${y}" font-size="${descriptionFontSize}" font-weight="normal" fill="${descriptionFillColor}" font-family="sans-serif" dominant-baseline="hanging">${escapeXml(line)}</text>\n`;
      });
    }

    const svgFull = `
    <svg width="${totalWidth}" height="${totalHeight}" viewBox="0 0 ${totalWidth} ${totalHeight}" overflow="visible" xmlns="http://www.w3.org/2000/svg">
      <rect width="${totalWidth}" height="${totalHeight}" fill="${backgroundColor}" />
      ${gridLines}
      <g>
        ${titleSvg}
        ${descriptionSvg}
      </g>
    </svg>
    `;

    const baseWithText = await sharp(Buffer.from(svgFull)).png().toBuffer();

    const alchemistImagePath = path.resolve(
      __dirname,
      "../../public/alchemist.webp"
    );
    const alchemistPng = await sharp(alchemistImagePath)
      .toFormat("png")
      .toBuffer();
    const imageSize = Math.min(380, imageAreaWidth - 60);
    const alchemistResized = await sharp(alchemistPng)
      .resize(imageSize, imageSize, {
        fit: "contain",
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .toBuffer();

    const imageLeft = textAreaWidth + (imageAreaWidth - imageSize) / 2;
    const imageTop = (totalHeight - imageSize) / 2;

    const gradientSize = imageSize * 1.15;
    const gradientLeft = imageLeft + (imageSize - gradientSize) / 2;
    const gradientTop = imageTop + (imageSize - gradientSize) / 2;

    const gradientSvg = `
    <svg width="${gradientSize}" height="${gradientSize}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="glow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#47caff" stop-opacity="0.75" />
          <stop offset="50%" stop-color="#47caff" stop-opacity="0.75" />
          <stop offset="50%" stop-color="#bd34fe" stop-opacity="0.75" />
          <stop offset="100%" stop-color="#bd34fe" stop-opacity="0.75" />
        </linearGradient>
        <filter id="blur-filter" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="15" /> 
        </filter>
      </defs>
      <circle cx="${gradientSize / 2}" cy="${gradientSize / 2}" r="${gradientSize / 2.4}" fill="url(#glow)" filter="url(#blur-filter)" />
    </svg>
    `;
    const gradientPng = await sharp(Buffer.from(gradientSvg)).png().toBuffer();

    const circleStrokeColor = "#282828"; // Adjusted circle border for the darkest bg
    const circleStrokeWidth = 2.5;
    const circleRadius = gradientSize / 2 - circleStrokeWidth / 2;
    const wizardCircleSvg = `
    <svg width="${totalWidth}" height="${totalHeight}" xmlns="http://www.w3.org/2000/svg">
      <circle cx="${gradientLeft + gradientSize / 2}" cy="${gradientTop + gradientSize / 2}" r="${circleRadius}" stroke="${circleStrokeColor}" stroke-width="${circleStrokeWidth}" fill="none" />
    </svg>`;
    const wizardCirclePng = await sharp(Buffer.from(wizardCircleSvg))
      .png()
      .toBuffer();

    const resultImage = await sharp(baseWithText)
      .composite([
        {
          input: gradientPng,
          top: Math.round(gradientTop),
          left: Math.round(gradientLeft),
        },
        {
          input: wizardCirclePng,
          top: 0,
          left: 0,
        },
        {
          input: alchemistResized,
          top: Math.round(imageTop),
          left: Math.round(imageLeft),
        },
      ])
      .flatten({ background: flattenBackgroundColor })
      .png()
      .toBuffer();

    await fs.writeFile(outputPath, resultImage);

    console.log(`Generated OG image: ${outputPath}`);
  } catch (error) {
    console.error("Error generating OG image:", error);
    throw error;
  }
}

/**
 * Wraps text to fit within a certain character limit per line
 */
function wrapText(text: string, charsPerLine: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let currentLine = "";

  words.forEach((word) => {
    if ((currentLine + " " + word).length <= charsPerLine) {
      currentLine += (currentLine ? " " : "") + word;
    } else {
      if (currentLine.length > 0) lines.push(currentLine);
      currentLine = word;
    }
  });

  if (currentLine.length > 0) {
    lines.push(currentLine);
  }

  if (lines.length === 0 && text.trim().length > 0) {
    lines.push(text.trim());
  } else if (lines.length === 0 && text.trim().length === 0) {
    return [];
  }
  return lines;
}

/**
 * Escapes XML special characters to prevent SVG rendering issues
 */
function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
