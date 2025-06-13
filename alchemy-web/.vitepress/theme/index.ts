// @ts-nocheck
import "virtual:group-icons.css";
import type { Theme as ThemeConfig } from "vitepress";
import { inBrowser, useRoute } from "vitepress";
import Theme from "vitepress/theme-without-fonts";
import { nextTick, onMounted, watch } from "vue";
import CodeSnippetHero from "./components/CodeSnippetHero.vue";
import FeaturesSection from "./components/FeaturesSection.vue";
import FeatureItem from "./components/FeatureItem.vue";
import "./style.css";

export default {
  extends: Theme,
  enhanceApp(ctx) {
    ctx.app.component("CodeSnippetHero", CodeSnippetHero);
    ctx.app.component("FeaturesSection", FeaturesSection);
    ctx.app.component("FeatureItem", FeatureItem);
  },
  // synchronizes code-group tabs
  // copied from: https://github.com/vuejs/vitepress/issues/2954#issuecomment-2517789015
  setup() {
    if (inBrowser) {
      const route = useRoute();

      // Click on the tab with the given label text
      function showCodeWithLabel(labelText) {
        document
          .querySelectorAll(".vp-code-group .tabs label")
          .forEach((label) => {
            if (label.innerText === labelText) {
              const input = document.getElementById(label.getAttribute("for"));

              if (!input.checked) {
                label.click();
              }
            }
          });
      }

      let preventScroll = false;

      function bindClickEvents() {
        // Find all the labels
        const labels = document.querySelectorAll(".vp-code-group .tabs label");

        labels.forEach((label) => {
          label.addEventListener("click", ($event) => {
            const labelFor = label.getAttribute("for");
            const initialRect = label.getBoundingClientRect();
            const initialScrollY = window.scrollY;

            // Save the selected tab
            localStorage.setItem("codeGroupTab", label.innerText);

            // Show the selected tab on each code group
            showCodeWithLabel(label.innerText);

            // Use nextTick to ensure DOM is updated and scroll to the position
            // so that the clicked label is at the same position as before
            nextTick(() => {
              if (preventScroll || !$event.isTrusted) {
                return;
              }

              // Find the new position of the label
              const labelNew = document.querySelector(
                `label[for="${labelFor}"]`,
              );
              const newRect = labelNew.getBoundingClientRect();

              // Calculate the difference in position relative to the document
              const yDiff =
                newRect.top +
                window.scrollY -
                (initialRect.top + initialScrollY);

              // Scroll to maintain the label's position
              scrollToY(initialScrollY + yDiff);
            });
          });
        });
      }

      // Scroll to the given Y position without animation
      function scrollToY(y) {
        window.scrollTo({
          top: y,
          behavior: "instant",
        });
      }

      // Select the given tab and scroll to the top of the page
      function selectTabAndScrollToTop(tab) {
        if (!tab) {
          return;
        }

        // Restore the last selected tab and scroll back to to top
        // Enable 'preventScroll' to avoid scrolling to all the tabs
        preventScroll = true;
        showCodeWithLabel(tab);
        nextTick(() => {
          preventScroll = false;
          scrollToY(0);
        });
      }

      // Bind click event on initial page and restore the last selected tab
      onMounted(() =>
        nextTick(() => {
          bindClickEvents();
          selectTabAndScrollToTop(localStorage.getItem("codeGroupTab"));
        }),
      );

      watch(
        () => route.path,
        () => {
          nextTick(() => {
            // Bind click event on new page
            bindClickEvents();
            selectTabAndScrollToTop(localStorage.getItem("codeGroupTab"));
          });
        },
      );
    }
  },
} satisfies ThemeConfig;
