---
title: "How we built a custom inventory system: stock in, stock out, batches and expiration dates"
description: "The real process behind an internal stock-control system for a business in Mexico, and why a spreadsheet eventually stops being enough."
publishDate: 2026-09-06
category: "Business software · Case study"
coverImage: "/blog/sistema-inventario-mexico.svg"
---

Almost every business that manages inventory starts the same way: a spreadsheet. It works fine while the catalog is small and only one person touches it. The problem shows up when it grows — more products, more people logging movements, more batches with expiration dates — and the spreadsheet starts showing numbers that don't match what's actually on the shelf.

That was, in essence, the starting point for one of the systems we built for a business in Mexico: replacing manual tracking with a tool that reflects real stock, in real time, without depending on someone remembering to update a cell by hand.

## What the system needed to solve

This wasn't just about "keeping a count." The business needed real traceability across several fronts at once:

**Stock in and stock out.** Every time inventory comes in or goes out, the system needs to update instantly — not at the end of the day, not "whenever someone gets around to updating the spreadsheet."

**Returns.** A product that comes back isn't the same as one that never left: it has to be distinguishable, and that movement needs to be documented just like any other.

**Batch tracking.** Not all stock of the same product is identical — it arrived in different purchases, on different dates, sometimes from different suppliers. Treating it all as one aggregate number hides information that eventually matters.

**Expiration dates.** This is the one that prevents the most headaches: without a system that tracks them by batch, it's easy for an expired product to stay mixed in with the rest, or for no one to notice it needs to be rotated out before it expires.

**Real-time reports.** All that detail is useless if someone has to be asked to put together a summary just to see it. The owner or manager needs to be able to open the system and see the current state of stock right there.

## Why this isn't "just a tidier spreadsheet"

It's tempting to think the problem can be solved with a better-designed spreadsheet, more columns and a few formulas. In practice, that's where most businesses get stuck: spreadsheets have no native way to prevent human error (a mistyped cell, a broken formula nobody notices), they don't scale well when several people are entering data at once, and they give no reliable history of what happened with each batch.

A custom-built system, on the other hand, is designed around the business's actual rules: what counts as a valid stock-in, what happens when something is returned, how available stock is calculated after subtracting what's already expired. Those rules live in the code, not in someone's memory.

## An internal tool, not a public product

This system is for internal use only — it has no public site, because it doesn't need one. Its only job is to give the team managing inventory a reliable source of truth, every day, about what's in stock, where it is, and how much time is left before it expires.

It's exactly the kind of project we enjoy most: it's not the flashiest part of a website, but it's the part that stops a business's operations from depending on nobody making a mistake in a spreadsheet.

If your business handles inventory, batches, or products with expiration dates and is still relying on spreadsheets to keep track, you probably already know the feeling of not fully trusting those numbers. That's almost always the sign it's worth talking about.
