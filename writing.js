const HASHNODE_QUERY = `query {
  publication(host: "dakheera47.hashnode.dev") {
    posts(first: 3) {
      edges {
        node {
          title
          brief
          subtitle
          url
          updatedAt
          views
          readTimeInMinutes
          coverImage {
            url
          }
          slug
        }
      }
    }
  }
}`;

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatNumber(value) {
  if (!value) return "0";
  return new Intl.NumberFormat("en-US").format(value);
}

function formatDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function renderWriting(posts) {
  const writingList = document.getElementById("writing-list");
  if (!writingList) return;

  if (!posts.length) {
    writingList.innerHTML = `
      <div>
        <p class="text-warm/70 font-serif">No writing found right now.</p>
      </div>
    `;
    return;
  }

  writingList.innerHTML = posts
    .map((post) => {
      const title = escapeHtml(post.title || "Untitled");
      const url = escapeHtml(post.url || "#");
      const readTime = Number(post.readTimeInMinutes) || 0;
      const views = Number(post.views) || 0;
      const publishedAt = formatDate(post.updatedAt);

      const meta = `${formatNumber(views)} views | ${readTime} min | Posted ${publishedAt || "Unknown"}`;

      return `
        <a href="${url}" target="_blank" rel="noopener noreferrer" class="group block py-1">
          <div class="md:flex md:items-center md:justify-between md:flex-nowrap md:gap-6">
            <p class="text-warmer font-serif group-hover:text-ember transition-colors md:min-w-0 md:truncate">${title}</p>
            <p class="text-xs font-mono uppercase tracking-wide text-warm/60 md:whitespace-nowrap">${meta}</p>
          </div>
        </a>
      `;
    })
    .join("");
}

async function fetchWriting() {
  const writingList = document.getElementById("writing-list");
  if (!writingList) return;

  try {
    const response = await fetch("https://gql.hashnode.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: HASHNODE_QUERY }),
    });

    if (!response.ok) {
      throw new Error(`Hashnode request failed with ${response.status}`);
    }

    const json = await response.json();
    const edges = json?.data?.publication?.posts?.edges || [];
    const posts = edges
      .map((edge) => edge?.node)
      .filter(Boolean)
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, 3);

    renderWriting(posts);
  } catch (error) {
    console.error("Failed to load writing:", error);
    writingList.innerHTML = `
      <div>
        <p class="text-warm/70 font-serif">Could not load writing right now.</p>
        <a href="https://hashnode.com/@DaKheera47" target="_blank" rel="noopener noreferrer" class="mt-2 inline-block text-warmer underline hover:text-ember transition-colors font-serif">
          Open Hashnode →
        </a>
      </div>
    `;
  }
}

window.addEventListener("DOMContentLoaded", () => {
  fetchWriting();
});
