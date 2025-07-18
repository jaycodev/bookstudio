$(document).ready(function () {
  const currentPage = $("#sidebar").attr("data-current-page");

  $(".nav-link").each(function () {
    const $link = $(this);
    const $icon = $link.find("i");

    if ($link.attr("href") === currentPage) {
      $link.addClass("active-effect");
      if ($icon.length) {
        const iconClass = $icon.attr("class").split(" ").pop();
        if (!iconClass.endsWith("-fill")) {
          $icon.removeClass(iconClass).addClass(iconClass + "-fill");
        }
      }
    } else {
      $link.removeClass("active-effect");
    }
  });

  function initNavTooltips() {
    $("#sidebar .nav-link").each(function () {
      const instance = bootstrap.Tooltip.getInstance(this);
      if (instance) instance.dispose();
    });
    $("#sidebar .nav-link").each(function () {
      const tooltipText = $(this).find(".sidebar-link").text().trim();
      if (tooltipText !== "") {
        if (!$(this).attr("title")) {
          $(this).attr("title", tooltipText);
        }
        new bootstrap.Tooltip(this, {
          trigger: "hover",
          placement: "right",
        });
      }
    });
  }

  function disposeNavTooltips() {
    $("#sidebar .nav-link").each(function () {
      const instance = bootstrap.Tooltip.getInstance(this);
      if (instance) instance.dispose();
    });
  }

  function initButtonTooltip() {
    const btn = $("#toggleSidebar")[0];
    const instance = bootstrap.Tooltip.getInstance(btn);
    if (instance) instance.dispose();
    $("#toggleSidebar").attr("title", "Abrir barra lateral");
    new bootstrap.Tooltip(btn, {
      trigger: "hover",
      placement: "right",
    });
  }

  function disposeButtonTooltip() {
    const btn = $("#toggleSidebar")[0];
    const instance = bootstrap.Tooltip.getInstance(btn);
    if (instance) instance.dispose();
    $("#toggleSidebar").removeAttr("title");
  }

  if ($("html").hasClass("collapsed")) {
    $("#sidebarArrow")
      .removeClass("bi-arrow-bar-left")
      .addClass("bi-arrow-bar-right");
    $("#toggleSidebar").attr("aria-label", "Abrir barra lateral");
    initNavTooltips();
    initButtonTooltip();
  } else {
    $("#toggleSidebar").attr("aria-label", "Cerrar barra lateral");
  }

  $("#toggleSidebar").click(function () {
    $("html").toggleClass("collapsed");

    const isCollapsed = $("html").hasClass("collapsed");
    localStorage.setItem("sidebarCollapsed", isCollapsed ? "true" : "false");

	const $icon = $('#sidebarArrow')

    if (isCollapsed) {
      $icon.removeClass("bi-arrow-bar-left").addClass("bi-arrow-bar-right");
      initNavTooltips();
      initButtonTooltip();
      $("#toggleSidebar").attr("aria-label", "Abrir barra lateral");
      $("#toggleSidebar .sidebar-link").text("Abrir barra lateral");
    } else {
      $icon.removeClass("bi-arrow-bar-right").addClass("bi-arrow-bar-left");
      disposeNavTooltips();
      disposeButtonTooltip();
      $("#toggleSidebar").attr("aria-label", "Cerrar barra lateral");
      $("#toggleSidebar .sidebar-link").text("Cerrar barra lateral");
    }
  });
});
